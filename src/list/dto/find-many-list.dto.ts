import { AbstractFindManyDto } from '../../common/dto/abstract/abstract-find-many.dto';
import { PaginatedQueryDto } from '../../common/dto/query/paginated.query.dto';
import { List } from '../schemas/list.schema';

export class FindManyListDto extends AbstractFindManyDto(List, List, PaginatedQueryDto) {
  constructor(partial: Partial<FindManyListDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
