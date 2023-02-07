import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { IFindManyMovie } from './interfaces/find-many-movie.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument, MovieSchema } from './schemas/movie.schema';
import { Model } from 'mongoose';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel('movies') private readonly movieModel: Model<MovieDocument>,
  ) {}

  findMany(filters: IFindManyMovie): any {
    return this.movieModel
      .find({})
      .limit(filters.limit)
      .skip((filters.page - 1) * filters.limit)
      .lean();
  }

  async findOne(id: number): Promise<Movie> {
    return this.movieModel.findOne({ id }).lean();
  }
}
