import { AbstractFindManyDto } from '../../common/dto/abstract/abstract-find-many.dto';
import { PaginatedQueryDto } from '../../common/dto/query/paginated.query.dto';
import { Review } from '../schemas/review.schema';

export class FindManyReviewDto extends AbstractFindManyDto(
  Review,
  Review,
  PaginatedQueryDto,
) {
  constructor(partial: Partial<FindManyReviewDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
