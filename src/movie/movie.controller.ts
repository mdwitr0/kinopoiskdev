import { MovieService } from './movie.service';
import { MovieDocsResponseDto } from './dto/movie-docs.response.dto';
import { Movie } from './schemas/movie.schema';

import { BaseControllerWithFindById } from 'src/common/base/base.controller';
import { Controller } from 'src/common/decorators/controller.decorator';
import { CacheInterceptor, Get, Query, UseInterceptors, Version } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PossibleValueDto as PossibleValueDto } from './dto/response/possible-value.response.dto';
import { GetPossibleValueDto } from './dto/get-possible-values.dto';
import { Paginated } from '../common/decorators/paginated.decorator';

import { IQuery } from '../common/interfaces/query.interface';
import { MovieAward } from './schemas/movie-award.schema';
import { MovieAwardDocsResponseDto } from './dto/response/movie-award-docs.response.dto';
import { SearchMovieResponseDto } from './dto/response/search-movie.response.dto';
import { SearchDto } from 'src/common/dto/query/search.dto';

@Controller('movie', 'Фильмы, сериалы, и т.д.')
export class MovieController extends BaseControllerWithFindById(
  Movie,
  MovieDocsResponseDto,
  'Универсальный поиск с фильтрами',
  `В этом методе вы можете составить запрос на получение фильма любой сложности.
  \nДля этого используете значения представленные ниже. Вы можете комбинировать поля, так же указывать множественные и специальные значения полей! 
  \nОбратите внимание, что этот метод возвращает множество результатов, поэтому по-умолчанию будет возвращены только определенные поля.
  \nЧтобы получить нужные вам поля, даже если его нет в ответе по-умолчанию используйте параметр \`selectFields\` `,
) {
  constructor(private readonly movieService: MovieService) {
    super(movieService);
  }

  @Version('1.2')
  @Get('search')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({
    summary: 'Полнотекстовый поиск',
    description: `Этот метод предназначен для полнотекстового поиска тайтлов по текстовому запросу. Он принимает только один параметр \`query\`. Если вам нужны фильтры, гибкость и множество результатов, используйте метод \`Универсальный поиск с фильтрами\` (findMany). В этом методе также не доступен выбор полей. А в ответ приходит упрощенная модель, которая подходит только для отображения результатов поиска.`,
  })
  async searchMovie(@Query() query: SearchDto): Promise<SearchMovieResponseDto> {
    return this.service.searchMovie(query);
  }

  @Get('random')
  @ApiOperation({
    summary: 'Получить рандомный тайтл из базы',
    description: `Этот метод не принимает ни каких параметров, так как выборка в нем уже достаточно релевантная. В него попадают тайтлы не старше 10 лет, рейтинг которых больше 6, есть название и постер.`,
  })
  @ApiResponse({ type: Movie })
  async getRandomMovie(): Promise<Movie> {
    return this.movieService.getRandomMovie();
  }

  @Get('possible-values-by-field')
  @ApiOperation({
    summary: 'Получить все возможные значения полей',
    description: `Этот метод принимает только определенные поля, и возвращает по ним все доступные значения.`,
  })
  @ApiResponse({ type: PossibleValueDto, isArray: true })
  async getPossibleValuesByFieldName(@Query() dto: GetPossibleValueDto): Promise<PossibleValueDto[]> {
    return this.movieService.getPossibleValuesByFieldName(dto);
  }

  @Version('1.1')
  @Get('awards')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Награды тайтлов' })
  @Paginated(MovieAwardDocsResponseDto, MovieAward, { findForAllProperties: true })
  async findManyAwardsByQuery(@Query() query: IQuery): Promise<MovieAwardDocsResponseDto> {
    return this.service.findManyAwards(query);
  }
}
