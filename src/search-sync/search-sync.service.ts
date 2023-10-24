import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MeiliService } from 'src/meili/meili.service';
import { MovieService } from 'src/movie/movie.service';
import { PersonService } from 'src/person/person.service';
import { MOVIE_INDEX, MOVIE_V1_4_INDEX } from '../movie/constants/movie-index';
import { PERSON_INDEX, PERSON_V1_4_INDEX } from '../person/constants/person-index';
import { Person } from '../person/schemas/person.schema';
import { Movie } from '../movie/schemas/movie.schema';
import { MeiliMovieEntity } from '../movie/entities/meili-movie.entity';
import { MeiliPersonEntity } from '../person/entities/meili-person.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SearchSync, SearchSyncDocument } from './schemas/search-sync.schema';
import { MeiliMovieEntityV1_4 } from '../movie/entities/v1.4/meili-movie.entity';
import { MeiliPersonEntityV1_4 } from '../person/entities/v1.4/meili-person.entity';

type EntityTypes = typeof MOVIE_INDEX | typeof PERSON_INDEX | typeof MOVIE_V1_4_INDEX | typeof PERSON_V1_4_INDEX;

@Injectable()
export class SearchSyncService implements OnModuleInit {
  private readonly logger = new Logger(SearchSyncService.name);
  constructor(
    @InjectModel(SearchSync.name) private readonly searchSyncModel: Model<SearchSyncDocument>,
    private readonly meiliService: MeiliService,
    private readonly movieService: MovieService,
    private readonly personService: PersonService,
  ) {}

  private async syncData<Entity>(entityType: EntityTypes, items: Entity[], pageIndex: number): Promise<void> {
    try {
      await this.meiliService.saveMany(items, entityType);
      this.logger.log(`Successfully synced ${entityType} - Page ${pageIndex}`);
    } catch (error) {
      this.logger.error(`Failed to sync ${entityType} - Page ${pageIndex}: ${error.message}`);
    }
  }

  private async syncEntity<Entity>(
    entityType: EntityTypes,
    service: MovieService | PersonService,
    pageSize = 1000,
  ): Promise<void> {
    return new Promise(async (resolve) => {
      const process = await this.searchSyncModel.findOne({ entityType });
      if (process?.processing) return;
      await this.searchSyncModel.updateOne({ entityType }, { processing: true }, { upsert: true });

      let pageIndex = 1;
      let hasMoreData = true;

      const processPage = async (pageIndex: number): Promise<number> => {
        const query = {
          skip: (pageIndex - 1) * pageSize,
          limit: pageSize,
          sort: { _id: -1 },
        };

        const result = await service.findMany(query);
        let entities = [];
        switch (entityType) {
          case MOVIE_INDEX:
            entities = (result.docs as Movie[]).map((movie) => new MeiliMovieEntity({}).fromMongoDocument(movie));
            break;
          case MOVIE_V1_4_INDEX:
            entities = (result.docs as Movie[]).map((movie) => new MeiliMovieEntityV1_4({}).fromMongoDocument(movie));
            break;
          case PERSON_INDEX:
            entities = (result.docs as Person[]).map((person) => new MeiliPersonEntity({}).fromMongoDocument(person));
            break;
          case PERSON_V1_4_INDEX:
            entities = (result.docs as Person[]).map((person) =>
              new MeiliPersonEntityV1_4({}).fromMongoDocument(person),
            );
            break;
          default:
            throw new Error(`Unknown entity type: ${entityType}`);
        }

        if (result.docs.length > 0) {
          await this.syncData<Entity>(entityType, entities, pageIndex);
          return result.docs.length;
        } else {
          return 0;
        }
      };

      try {
        while (hasMoreData) {
          const pageIndices = Array.from({ length: 5 }, (_, i) => i + pageIndex);
          const results = await Promise.all(pageIndices.map((index) => processPage(index)));

          pageIndex += 5;

          if (results.some((count) => count < pageSize)) {
            hasMoreData = false;
          }
        }
      } catch (error) {
        this.logger.error(`Failed to sync ${entityType}: ${error.message}`);
      } finally {
        await this.searchSyncModel.updateOne({ entityType }, { processing: false });
      }
      resolve();
    });
  }

  @Cron(CronExpression.EVERY_WEEK)
  async syncMovies() {
    this.logger.log('Starting sync for movies');
    await this.syncEntity<Movie>(MOVIE_INDEX, this.movieService, 1000);
    await this.syncEntity<Movie>(MOVIE_V1_4_INDEX, this.movieService, 1000);
    this.logger.log('Finished sync for movies');
  }

  @Cron(CronExpression.EVERY_WEEK)
  async syncPersons() {
    this.logger.log('Starting sync for persons');
    await this.syncEntity<Person>(PERSON_INDEX, this.personService, 1000);
    await this.syncEntity<Person>(PERSON_V1_4_INDEX, this.personService, 1000);
    this.logger.log('Finished sync for persons');
  }

  async onModuleInit() {
    Promise.all([this.syncMovies(), this.syncPersons()]);
  }
}
