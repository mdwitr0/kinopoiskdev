import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  SerializeOptions,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiDotNotationQuery } from '../common/decorators/api-dot-notation-query.decorator';
import { PaginatedQueryDto } from '../common/dto/query/paginated.query.dto';
import { MovieDocsResponseDto } from './dto/movie-docs.response.dto';
import { ParseDotNotationQuery } from '../common/pipes/parse-dot-notation-query.pipe';
import { FindManyMovieDto } from './dto/find-many-movie.dto';
import { Movie } from './schemas/movie.schema';

@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludeExtraneousValues: true })
@ApiTags('Movies')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @ApiOperation({ summary: 'Поиск фильмов' })
  @ApiDotNotationQuery(Movie)
  @ApiResponse({ type: MovieDocsResponseDto, isArray: true })
  async finManyByQuery(
    @Query(ParseDotNotationQuery, ValidationPipe) dto: FindManyMovieDto,
  ): Promise<MovieDocsResponseDto> {
    return this.movieService.findMany(dto);
  }

  @ApiResponse({ type: Movie })
  @Get(':id')
  findOne(@Param('id') id: string): Movie {
    return this.movieService.findOne(+id);
  }
}
