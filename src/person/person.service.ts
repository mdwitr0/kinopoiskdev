import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IQuery } from 'src/common/interfaces/query.interface';
import { PersonDocument } from './schemas/person.schema';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel('people') private readonly personModel: Model<PersonDocument>,
  ) {}

  async findMany(query: IQuery): Promise<PersonDocument[]> {
    return this.personModel
      .find(query.filter)
      .limit(query.limit)
      .skip(query.skip)
      .sort(query.sort)
      .lean();
  }

  async findOne(id: number): Promise<PersonDocument> {
    return this.personModel.findOne({ id }).lean();
  }
}
