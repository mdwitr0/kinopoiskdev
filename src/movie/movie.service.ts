import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from './schemas/movie.schema';
import { Model } from 'mongoose';
import { getRandomInt } from 'src/common/utils/get-random-int.util';
import { GetPossibleValueDto } from './dto/get-possible-values.dto';
import { PossibleValueDto } from './dto/response/possible-value.response.dto';
import { IQuery } from '../common/interfaces/query.interface';
import { MovieAward, MovieAwardDocument } from './schemas/movie-award.schema';
import { MovieAwardDocsResponseDto } from './dto/response/movie-award-docs.response.dto';
import { DateTime } from 'luxon';
import { MeiliService } from '../meili/meili.service';
import { MeiliMovieEntity } from './entities/meili-movie.entity';
import { SearchMovieResponseDto } from './dto/response/search-movie.response.dto';
import { MOVIE_INDEX } from './constants/movie-index';
import { SearchDto } from 'src/common/dto/query/search.dto';
import { MovieDocsResponseDtoV1 } from './dto/v1/movie-docs.response.dto';
import { MovieDtoV1 } from './dto/v1/movie.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MovieService {
  private readonly logger = new Logger(MovieService.name);
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>,
    @InjectModel(MovieAward.name) private readonly movieAwardModel: Model<MovieAwardDocument>,
    private readonly meiliService: MeiliService,
    private readonly configService: ConfigService,
  ) {}

  async findMany(query: IQuery): Promise<MovieDocsResponseDtoV1> {
    const [total, docs] = await Promise.all([
      this.movieModel.countDocuments(query.filter),
      this.movieModel
        .find(query.filter)
        .sort(Object.keys(query.sort)?.length ? { ...query.sort, _id: -1 } : { 'votes.kp': -1, _id: -1 })
        .limit(query.limit)
        .skip(query.skip)
        .select(query.select)
        .allowDiskUse(true)
        .exec(),
    ]);

    // @ts-ignore
    const docsToJson = docs.map((doc) => doc?.toJSON());
    return {
      docs: docsToJson,
      total,
      limit: query.limit,
      page: query.skip / query.limit + 1,
      pages: Math.ceil(total / query.limit),
    };
  }

  async findOne(id: number | string): Promise<MovieDtoV1> {
    const found = await this.movieModel.findOne({ id });
    if (found) {
      // @ts-ignore
      return found.toJSON();
    } else {
      await this.addMovie(id);
    }
    return found;
  }

  async searchMovie(dto: SearchDto): Promise<SearchMovieResponseDto> {
    const offset = (dto.page - 1) * dto.limit;
    const searchResponse = await this.meiliService.search<MeiliMovieEntity>(dto.query, MOVIE_INDEX, dto.limit, offset);

    const movieEntities = searchResponse.hits.map((movie) => new MeiliMovieEntity(movie));

    return {
      docs: movieEntities,
      total: searchResponse.estimatedTotalHits,
      limit: dto.limit,
      page: dto.page,
      pages: Math.ceil(searchResponse.estimatedTotalHits / dto.limit),
    };
  }

  async getRandomMovie(): Promise<Movie> {
    const currentYear = DateTime.local().year;
    const filter = {
      'rating.kp': {
        $gte: 6,
        $lte: 10,
      },
      year: { $lte: currentYear, $gte: currentYear - 10 },
      name: { $ne: null },
      'poster.url': { $ne: null },
    };

    const count = await this.movieModel.countDocuments(filter);

    return this.movieModel.findOne(filter).skip(getRandomInt(1, count)).lean();
  }

  async getPossibleValuesByFieldName({ field }: GetPossibleValueDto): Promise<PossibleValueDto[]> {
    const values = await this.movieModel.distinct(field).exec();

    return values.filter((value) => value).map((value) => new PossibleValueDto(value));
  }

  async findManyAwards(query: IQuery): Promise<MovieAwardDocsResponseDto> {
    const [total, docs] = await Promise.all([
      this.movieAwardModel.countDocuments(query.filter),
      this.movieAwardModel
        .find(query.filter)
        .limit(query.limit)
        .skip(query.skip)
        .select(query.select)
        .sort(Object.keys(query.sort)?.length ? query.sort : { 'nomination.award.year': -1 })
        .exec(),
    ]);

    const docsToJson = docs.map((doc) => doc?.toJSON());
    return {
      docs: docsToJson,
      total,
      limit: query.limit,
      page: query.skip / query.limit + 1,
      pages: Math.ceil(total / query.limit),
    };
  }

  async addMovie(id: number | string): Promise<void> {
    this.logger.log(`Add movie with id: ${id}`);
    const baseUrl = this.configService.get('UPDATE_API_BASE_URL');
    const resp = await fetch(`${baseUrl}/movie`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        updateData: [
          'base',
          'premiere',
          'facts',
          'fees',
          'budget',
          'videos',
          'similarMovies',
          'images',
          'persons',
          'allDataPersons',
          'sequelsAndPrequels',
          'reviews',
        ],
        ids: [id],
      }),
    });
  }
}
