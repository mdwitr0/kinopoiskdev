import { AbstractFindManyDto } from '../../common/dto/abstract/abstract-find-many.dto';
import { PaginatedQueryDto } from '../../common/dto/query/paginated.query.dto';
import { Keyword } from '../schemas/keyword.schema';

export class FindManyKeywordDto extends AbstractFindManyDto(Keyword, Keyword, PaginatedQueryDto) {
  constructor(partial: Partial<FindManyKeywordDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
