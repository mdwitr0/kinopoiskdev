import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from './schemas/movie.schema';
import { Model } from 'mongoose';
import { BaseService } from 'src/common/base/base.service';

@Injectable()
export class MovieService extends BaseService<Movie> {
  constructor(
    @InjectModel('movies') private readonly movieModel: Model<MovieDocument>,
  ) {
    super(movieModel);
  }
}
