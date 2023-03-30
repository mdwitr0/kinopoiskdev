import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from './schemas/movie.schema';
import { Model } from 'mongoose';
import { BaseService } from 'src/common/base/base.service';
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
import { SearchMovieDto } from './dto/search-movie.dto';
import { MOVIE_INDEX } from './constants/movie-index';

@Injectable()
export class MovieService extends BaseService<Movie> {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>,
    @InjectModel(MovieAward.name) private readonly movieAwardModel: Model<MovieAwardDocument>,
    private readonly meiliService: MeiliService,
  ) {
    super(movieModel);
  }

  async searchMovie(dto: SearchMovieDto): Promise<SearchMovieResponseDto> {
    const offset = (dto.page - 1) * dto.limit;
    const searchResponse = await this.meiliService.search<MeiliMovieEntity>(dto.query, MOVIE_INDEX, dto.limit, offset);

    const shortMovieResponseDtos = searchResponse.hits.map((movie) => new MeiliMovieEntity(movie));

    return {
      docs: shortMovieResponseDtos,
      total: searchResponse.totalHits,
      limit: dto.limit,
      page: dto.page,
      pages: Math.ceil(searchResponse.totalHits / dto.limit),
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
}
