import { ApiProperty } from '@nestjs/swagger';
import { PaginatedQueryDto } from 'src/common/dto/query/paginated.query.dto';

export class SearchMovieDto extends PaginatedQueryDto {
  @ApiProperty({ description: 'Название фильма' })
  query: string;

  constructor(partial: Partial<SearchMovieDto>) {
    super();
    Object.assign(this, partial);
  }
}
