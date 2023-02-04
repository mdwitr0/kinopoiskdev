import { AbstractFindManyDto } from '../../common/dto/abstract/abstract-find-many.dto';
import { PaginatedQueryDto } from '../../common/dto/query/paginated.query.dto';
import { Movie } from '../schemas/movie.schema';

export class FindManyMovieDto extends AbstractFindManyDto(
  Movie,
  Movie,
  PaginatedQueryDto,
) {
  constructor(partial: Partial<FindManyMovieDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
