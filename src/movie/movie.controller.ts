import { MovieService } from './movie.service';
import { MovieDocsResponseDto } from './dto/movie-docs.response.dto';
import { Movie } from './schemas/movie.schema';

import { BaseControllerWithFindById } from 'src/common/base/base.controller';
import { Controller } from 'src/common/decorators/controller.decorator';
import { Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PossibleValueDto as PossibleValueDto } from './dto/response/possible-value.response.dto';
import { GetPossibleValueDto } from './dto/get-possible-values.dto';

@Controller('movie', 'Фильмы, сериалы, и т.д.')
export class MovieController extends BaseControllerWithFindById(Movie, MovieDocsResponseDto, 'Поиск тайтлов') {
  constructor(private readonly movieService: MovieService) {
    super(movieService);
  }

  @Get('random')
  @ApiOperation({ summary: 'Получить рандомный тайтл из базы' })
  @ApiResponse({ type: Movie })
  async getRandomMovie(): Promise<Movie> {
    return this.movieService.getRandomMovie();
  }

  @Get('possible-values-by-field')
  @ApiOperation({ summary: 'Получить все возможные значения полей' })
  @ApiResponse({ type: PossibleValueDto, isArray: true })
  async getPossibleValuesByFieldName(@Query() dto: GetPossibleValueDto): Promise<PossibleValueDto[]> {
    return this.movieService.getPossibleValuesByFieldName(dto);
  }
}
