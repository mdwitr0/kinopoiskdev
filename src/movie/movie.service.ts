import { BadRequestException, Injectable, Logger, OnModuleInit } from '@nestjs/common';
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
import { MOVIE_INDEX, MOVIE_V1_4_INDEX } from './constants/movie-index';
import { SearchDto } from 'src/common/dto/query/search.dto';
import { MovieDocsResponseDtoV1 } from './dto/v1/movie-docs.response.dto';
import { MovieDtoV1 } from './dto/v1/movie.dto';
import { ConfigService } from '@nestjs/config';
import { SearchMovieResponseDtoV1_4 } from './dto/v1.4/search-movie.response.dto';
import { MeiliMovieEntityV1_4 } from './entities/v1.4/meili-movie.entity';
import { SearchMovieResponseDto } from './dto/response/search-movie.response.dto';
import { MovieRequestDtoV1_4 } from './dto/v1.4/movie-request.dto';
import { MovieDocsResponseDtoV1_4 } from './dto/v1.4/movie-docs.response.dto';
import { MovieDtoV1_4 } from './dto/v1.4/movie.dto';
import { MovieAwardRequestDtoV1_4 } from './dto/v1.4/movie-award-request.dto';
import { MovieRandomRequestDtoV1_4 } from './dto/v1.4/movie-random-request.dto';

@Injectable()
export class MovieService implements OnModuleInit {
  private moviesLimit: number;
  private readonly logger = new Logger(MovieService.name);
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>,
    @InjectModel(MovieAward.name) private readonly movieAwardModel: Model<MovieAwardDocument>,
    private readonly meiliService: MeiliService,
    private readonly configService: ConfigService,
  ) {}

  async findManyV1_4(request: MovieRequestDtoV1_4): Promise<MovieDocsResponseDtoV1_4> {
    const filter = request.model2Where();
    const select = request.model2Select();
    const sort = request.model2Sort();
    const { skip, limit } = request.model2Pagination();

    if (skip > this.moviesLimit) {
      throw new BadRequestException(`Вы пытаетесь запросить больше страниц, чем доступно на самом деле!`);
    }

    const time = Date.now();

    const [total, docs] = await Promise.all([
      this.movieModel.countDocuments(filter),
      this.movieModel
        .find(filter)
        .sort(sort)
        .limit(limit)
        .skip(skip)
        .select(select || {})
        .allowDiskUse(true)
        .exec(),
    ]);

    this.logger.log(`Movie response`, { time: Date.now() - time, filter });

    const docsToJson = docs.map((doc) => doc?.toJSON());
    return {
      docs: docsToJson,
      total,
      limit: request.limit,
      page: skip / limit + 1,
      pages: Math.ceil(total / limit),
    };
  }

  async findOneV1_4(id: number | string): Promise<MovieDtoV1_4> {
    const found = await this.movieModel.findOne({ id });
    if (found) {
      // @ts-ignore
      return found.toJSON();
    }

    return found;
  }

  async getRandomMovieV1_4(request: MovieRandomRequestDtoV1_4): Promise<MovieDtoV1_4> {
    const filter = request.model2Where();

    const count = await this.movieModel.countDocuments(filter);

    return this.movieModel.findOne(filter).skip(getRandomInt(1, count)).lean();
  }

  async findManyAwardsV1_4(request: MovieAwardRequestDtoV1_4): Promise<MovieAwardDocsResponseDto> {
    const filter = request.model2Where();
    const select = request.model2Select();
    const sort = request.model2Sort();
    const { skip, limit } = request.model2Pagination();

    const [total, docs] = await Promise.all([
      this.movieAwardModel.countDocuments(filter),
      this.movieAwardModel.find(filter).sort(sort).limit(limit).skip(skip).select(select).allowDiskUse(true).exec(),
    ]);

    const docsToJson = docs.map((doc) => doc?.toJSON());
    return {
      docs: docsToJson,
      total,
      limit: request.limit,
      page: skip / limit + 1,
      pages: Math.ceil(total / limit),
    };
  }

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

  async searchMovieV1_4(dto: SearchDto): Promise<SearchMovieResponseDtoV1_4> {
    const offset = (dto.page - 1) * dto.limit;
    const searchResponse = await this.meiliService.search<MeiliMovieEntityV1_4>(dto.query, MOVIE_V1_4_INDEX, dto.limit, offset);

    const movieEntities = searchResponse.hits.map((movie) => new MeiliMovieEntityV1_4(movie));

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

    return values.filter((value) => value).map((value) => new PossibleValueDto(value as string));
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

  cursor() {
    return this.movieModel.find({}).cursor();
  }

  async onModuleInit() {
    const count = await this.movieModel.countDocuments();
    if (count > 0) this.moviesLimit = count;
  }
}
