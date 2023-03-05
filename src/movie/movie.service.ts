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

@Injectable()
export class MovieService extends BaseService<Movie> {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>,
    @InjectModel(MovieAward.name) private readonly movieAwardModel: Model<MovieAwardDocument>,
  ) {
    super(movieModel);
  }

  async getRandomMovie(): Promise<Movie> {
    const filter = {
      'rating.kp': {
        $gte: 4,
        $lte: 10,
      },
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
