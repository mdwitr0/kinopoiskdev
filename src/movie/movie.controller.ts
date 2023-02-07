import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiDotNotationQuery } from '../common/decorators/api-dot-notation-query.decorator';
import { PaginatedQueryDto } from '../common/dto/query/paginated.query.dto';
import { MovieDocsResponseDto } from './dto/movie-docs.response.dto';
import { Movie } from './schemas/movie.schema';
import { ToolsQueryDto } from '../common/dto/query/tools.query.dto';
import { IFindManyMovie } from './interfaces/find-many-movie.interface';

@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludeExtraneousValues: true })
@ApiTags('Movies')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @ApiOperation({ summary: 'Поиск фильмов' })
  @ApiDotNotationQuery(ToolsQueryDto, PaginatedQueryDto, Movie)
  @ApiResponse({ type: MovieDocsResponseDto, isArray: true })
  async finManyByQuery(
    @Query() filters: IFindManyMovie,
  ): Promise<MovieDocsResponseDto> {
    return this.movieService.findMany(filters);
  }

  @ApiResponse({ type: Movie })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Movie> {
    return this.movieService.findOne(+id);
  }
}
