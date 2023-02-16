import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  SerializeOptions,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiDotNotationQuery } from '../common/decorators/api-dot-notation-query.decorator';
import { PaginatedQueryDto } from '../common/dto/query/paginated.query.dto';
import { MovieDocsResponseDto } from './dto/movie-docs.response.dto';
import { Movie } from './schemas/movie.schema';
import { ToolsQueryDto } from '../common/dto/query/tools.query.dto';
import { IFindManyMovie } from './interfaces/find-many-movie.interface';
import { QueryPipe } from 'src/common/pipes/query.pipe';
import { IQuery } from 'src/common/interfaces/query.interface';

@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludeExtraneousValues: true })
@ApiTags('Movies')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @UsePipes(new QueryPipe())
  @ApiOperation({ summary: 'Поиск фильмов' })
  @ApiDotNotationQuery(ToolsQueryDto, PaginatedQueryDto, Movie)
  @ApiResponse({ type: MovieDocsResponseDto, isArray: true })
  async finManyByQuery(@Query() query: IQuery): Promise<MovieDocsResponseDto> {
    return this.movieService.findMany(query);
  }

  @ApiResponse({ type: Movie })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Movie> {
    return this.movieService.findOne(+id);
  }
}
