import { ApiProperty } from '@nestjs/swagger';
import { PaginatedQueryDto } from 'src/common/dto/query/paginated.query.dto';

export class SearchDto extends PaginatedQueryDto {
  @ApiProperty({ description: 'Поисковый запрос' })
  query: string;

  constructor(partial: Partial<SearchDto>) {
    super();
    Object.assign(this, partial);
  }
}
