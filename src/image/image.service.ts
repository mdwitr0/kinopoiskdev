import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IQuery } from 'src/common/interfaces/query.interface';
import { Movie } from 'src/movie/schemas/movie.schema';

import { ImageDocument } from './schemas/image.schema';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel('images') private readonly imageModel: Model<ImageDocument>,
  ) {}

  async findMany(query: IQuery): Promise<ImageDocument[]> {
    return this.imageModel
      .find(query.filter)
      .limit(query.limit)
      .skip(query.skip)
      .sort(query.sort)
      .lean();
  }

  async findOne(id: number): Promise<ImageDocument> {
    return this.imageModel.findOne({ id }).lean();
  }
}
