import { AbstractFindManyDto } from '../../common/dto/abstract/abstract-find-many.dto';
import { PaginatedQueryDto } from '../../common/dto/query/paginated.query.dto';
import { Image } from '../schemas/image.schema';

export class FindManyImageDto extends AbstractFindManyDto(Image, Image, PaginatedQueryDto) {
  constructor(partial: Partial<FindManyImageDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
