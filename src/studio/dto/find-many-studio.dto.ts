import { AbstractFindManyDto } from '../../common/dto/abstract/abstract-find-many.dto';
import { PaginatedQueryDto } from '../../common/dto/query/paginated.query.dto';
import { Studio } from '../schemas/studio.schema';

export class FindManyStudioDto extends AbstractFindManyDto(Studio, Studio, PaginatedQueryDto) {
  constructor(partial: Partial<FindManyStudioDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
