import { AbstractFindManyDto } from '../../../common/dto/abstract/abstract-find-many.dto';
import { PaginatedQueryDto } from '../../../common/dto/query/paginated.query.dto';
import { List } from '../../schemas/list.schema';

export class FindManyListDtoV1_4 extends AbstractFindManyDto(List, List, PaginatedQueryDto) {
  constructor(partial: Partial<FindManyListDtoV1_4>) {
    super(partial);
    Object.assign(this, partial);
  }
}
