import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/common/base/base.service';
import { IQuery } from 'src/common/interfaces/query.interface';
import { Person, PersonDocument } from 'src/person/schemas/person.schema';
import { PersonAwardDocsResponseDto } from './dto/person-award-docs.response.dto';
import { PersonAward, PersonAwardDocument } from './schemas/person-award.schema';

@Injectable()
export class PersonService extends BaseService<Person> {
  constructor(
    @InjectModel(Person.name) private readonly personModel: Model<PersonDocument>,
    @InjectModel(PersonAward.name) private readonly personAwardModel: Model<PersonAwardDocument>,
  ) {
    super(personModel);
  }

  async findManyAwards(query: IQuery): Promise<PersonAwardDocsResponseDto> {
    const [total, docs] = await Promise.all([
      this.personAwardModel.countDocuments(query.filter),
      this.personAwardModel
        .find(query.filter)
        .limit(query.limit)
        .skip(query.skip)
        .select(query.select)
        .sort(Object.keys(query.sort)?.length ? query.sort : { 'nomination.award.year': -1 })
        .allowDiskUse(true)
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
