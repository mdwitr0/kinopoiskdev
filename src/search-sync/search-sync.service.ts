import { Injectable, Logger } from '@nestjs/common';
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
export class SearchSyncService {
  private readonly logger = new Logger(SearchSyncService.name);
  constructor(
    @InjectModel(SearchSync.name) private readonly searchSyncModel: Model<SearchSyncDocument>,
    private readonly meiliService: MeiliService,
    private readonly movieService: MovieService,
    private readonly personService: PersonService,
  ) {
    this.searchSyncModel.deleteMany({});
    this.syncMovies();
    this.syncPersons();
  }

  private async syncData<Entity>(entityType: EntityTypes, items: Entity[], pageIndex: number): Promise<void> {
    try {
      await this.meiliService.saveMany(items, entityType);
      this.logger.log(`Successfully synced ${entityType} - Page ${pageIndex}`);
    } catch (error) {
      this.logger.error(`Failed to sync ${entityType} - Page ${pageIndex}: ${error.message}`);
    }
  }

  private async syncEntity<Entity>(entityType: EntityTypes, service: MovieService | PersonService): Promise<void> {
    this.logger.log(`Starting sync for ${entityType}`);
    const process = await this.searchSyncModel.findOne({ entityType });
    if (process?.processing) return;
    await this.searchSyncModel.updateOne({ entityType }, { processing: true }, { upsert: true });

    try {
      const cursor = service.cursor();
      for await (const item of cursor) {
        const entity = this.prepareEntity(item, entityType);
        await this.meiliService.save(entity, entityType);
        this.logger.log(`Successfully synced ${entityType}: ${entity.id}`);
      }
    } catch (error) {
      this.logger.error(`Failed to sync ${entityType}: ${error.message}`);
    } finally {
      await this.searchSyncModel.updateOne({ entityType }, { processing: false });
    }
  }

  prepareEntity<T>(item: T, entityType: EntityTypes): MeiliMovieEntity | MeiliPersonEntity | MeiliMovieEntityV1_4 | MeiliPersonEntityV1_4 {
    switch (entityType) {
      case MOVIE_INDEX:
        return new MeiliMovieEntity({}).fromMongoDocument(item as Movie);
      case MOVIE_V1_4_INDEX:
        return new MeiliMovieEntityV1_4({}).fromMongoDocument(item as Movie);
      case PERSON_INDEX:
        return new MeiliPersonEntity({}).fromMongoDocument(item as Person);
      case PERSON_V1_4_INDEX:
        return new MeiliPersonEntityV1_4({}).fromMongoDocument(item as Person);
      default:
        break;
    }
  }

  @Cron(CronExpression.EVERY_WEEK)
  async syncMovies() {
    this.logger.log('Starting sync for movies');
    await this.syncEntity<Movie>(MOVIE_V1_4_INDEX, this.movieService);
    await this.syncEntity<Movie>(MOVIE_INDEX, this.movieService);
    this.logger.log('Finished sync for movies');
  }

  @Cron(CronExpression.EVERY_WEEK)
  async syncPersons() {
    this.logger.log('Starting sync for persons');
    await this.syncEntity<Person>(PERSON_V1_4_INDEX, this.personService);
    await this.syncEntity<Person>(PERSON_INDEX, this.personService);
    this.logger.log('Finished sync for persons');
  }
}
