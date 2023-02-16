import { Injectable } from '@nestjs/common';
import { IFindManyMovie } from './interfaces/find-many-movie.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from './schemas/movie.schema';
import { Model } from 'mongoose';
import { IQuery } from 'src/common/interfaces/query.interface';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel('movies') private readonly movieModel: Model<MovieDocument>,
  ) {}

  findMany(query: IQuery): any {
    return this.movieModel
      .find(query.filter)
      .limit(query.limit)
      .skip(query.skip)
      .sort(query.sort)
      .lean();
  }

  async findOne(id: number): Promise<Movie> {
    return this.movieModel.findOne({ id }).lean();
  }
}
