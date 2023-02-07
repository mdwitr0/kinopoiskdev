import { PaginatedQueryDto } from '../../common/dto/query/paginated.query.dto';
import { Movie } from '../schemas/movie.schema';
import { ToolsQueryDto } from '../../common/dto/query/tools.query.dto';

export interface IFindManyMovie
  extends ToolsQueryDto,
    PaginatedQueryDto,
    Movie {}
