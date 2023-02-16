import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IQuery } from 'src/common/interfaces/query.interface';

import { ReviewDocument } from './schemas/review.schema';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel('reviews') private readonly imageModel: Model<ReviewDocument>,
  ) {}

  async findMany(query: IQuery): Promise<ReviewDocument[]> {
    return this.imageModel
      .find(query.filter)
      .limit(query.limit)
      .skip(query.skip)
      .sort(query.sort)
      .lean();
  }

  async findOne(id: number): Promise<ReviewDocument> {
    return this.imageModel.findOne({ id }).lean();
  }
}
