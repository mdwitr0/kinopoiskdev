import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from './schemas/movie.schema';
import { Model } from 'mongoose';
import { BaseService } from 'src/common/base/base.service';
import { getRandomInt } from 'src/common/utils/get-random-int.util';
import { GetPossibleValueDto } from './dto/get-possible-values.dto';
import { PossibleValueDto } from './dto/response/possible-value.response.dto';

@Injectable()
export class MovieService extends BaseService<Movie> {
  constructor(@InjectModel('movies') private readonly movieModel: Model<MovieDocument>) {
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
}
