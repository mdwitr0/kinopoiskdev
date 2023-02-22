import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/common/base/base.service';
import { Person, PersonDocument } from 'src/person/schemas/person.schema';

@Injectable()
export class PersonService extends BaseService<Person> {
  constructor(@InjectModel(Person.name) private readonly personModel: Model<PersonDocument>) {
    super(personModel);
  }
}
