import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonService {
  create(createPersonDto: CreatePersonDto) {
    return 'This action adds a new person';
  }

  findMany(data: any): any {
    return `This action returns all person`;
  }

  findOne(id: number): any {
    return `This action returns a #${id} person`;
  }
}
