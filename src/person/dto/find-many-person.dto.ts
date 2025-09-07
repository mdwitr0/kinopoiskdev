import { AbstractFindManyDto } from '../../common/dto/abstract/abstract-find-many.dto';
import { PaginatedQueryDto } from '../../common/dto/query/paginated.query.dto';
import { Person } from '../schemas/person.schema';

export class FindManyPersonDto extends AbstractFindManyDto(Person, Person, PaginatedQueryDto) {
  constructor(partial: Partial<FindManyPersonDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
