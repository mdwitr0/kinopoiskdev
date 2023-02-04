import { AbstractFindManyDto } from '../../common/dto/abstract/abstract-find-many.dto';
import { PaginatedQueryDto } from '../../common/dto/query/paginated.query.dto';
import { Season } from '../schemas/season.schema';

export class FindManySeasonDto extends AbstractFindManyDto(
  Season,
  Season,
  PaginatedQueryDto,
) {
  constructor(partial: Partial<FindManySeasonDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
