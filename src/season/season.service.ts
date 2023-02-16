import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IQuery } from 'src/common/interfaces/query.interface';

import { SeasonDocument } from './schemas/season.schema';

@Injectable()
export class SeasonService {
  constructor(
    @InjectModel('seasons') private readonly imageModel: Model<SeasonDocument>,
  ) {}

  async findMany(query: IQuery): Promise<SeasonDocument[]> {
    return this.imageModel
      .find(query.filter)
      .limit(query.limit)
      .skip(query.skip)
      .sort(query.sort)
      .lean();
  }

  async findOne(id: number): Promise<SeasonDocument> {
    return this.imageModel.findOne({ id }).lean();
  }
}
