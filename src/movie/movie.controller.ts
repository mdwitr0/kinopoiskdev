import { MovieService } from './movie.service';
import { MovieDocsResponseDtoV1 } from './dto/v1/movie-docs.response.dto';

import { Controller } from 'src/common/decorators/controller.decorator';
import { Get, NotFoundException, Param, Query, UseInterceptors, Version } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PossibleValueDto as PossibleValueDto } from './dto/response/possible-value.response.dto';
import { GetPossibleValueDto } from './dto/get-possible-values.dto';
import { Paginated } from '../common/decorators/paginated.decorator';

import { IQuery } from '../common/interfaces/query.interface';
import { MovieAward } from './schemas/movie-award.schema';
import { MovieAwardDocsResponseDto } from './dto/response/movie-award-docs.response.dto';
import { SearchMovieResponseDto } from './dto/response/search-movie.response.dto';
import { SearchDto } from 'src/common/dto/query/search.dto';
import { MovieDtoV1 } from './dto/v1/movie.dto';
import { ApiBaseResponse } from 'src/common/decorators/api-base-response.decorator';
import { ForbiddenErrorResponseDto } from 'src/common/dto/errors/forbidden-error.response.dto';
import { MovieDtoV1_3 } from './dto/v1.3/movie.dto';
import { MovieDocsResponseDtoV1_3 } from './dto/v1.3/movie-docs.response.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('movie', 'Фильмы, сериалы, и т.д.')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Version('1.3')
  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({
    summary: 'Универсальный поиск с фильтрами',
    description: `В этом методе вы можете составить запрос на получение фильма любой сложности.
  \nДля этого используете значения представленные ниже. Вы можете комбинировать поля, так же указывать множественные и специальные значения полей! 
  \nОбратите внимание, что этот метод возвращает множество результатов, поэтому по-умолчанию будет возвращены только определенные поля.
  \nЧтобы получить нужные вам поля, даже если его нет в ответе по-умолчанию используйте параметр \`selectFields\` `,
  })
  @Paginated(MovieDocsResponseDtoV1_3, MovieDtoV1_3, { findForAllProperties: true })
  async findManyByQueryV1_3(@Query() query: IQuery): Promise<MovieDocsResponseDtoV1> {
    return this.movieService.findMany(query);
  }

  @Version('1.3')
  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Поиск по id', description: 'Возвращает всю доступную информацию о сущности.' })
  @ApiBaseResponse({ type: MovieDtoV1_3 })
  @ApiNotFoundResponse({ type: ForbiddenErrorResponseDto, description: 'NotFound' })
  async findOneV1_3(@Param('id') id: string): Promise<any> {
    const found = await this.movieService.findOne(+id);
    if (!found) throw new NotFoundException('По этому id ничего не найдено!');
    // ts-ignore
    return found;
  }

  @Version('1.3')
  @Get('random')
  @ApiOperation({
    summary: 'Получить рандомный тайтл из базы',
    description: `Этот метод не принимает ни каких параметров, так как выборка в нем уже достаточно релевантная. В него попадают тайтлы не старше 10 лет, рейтинг которых больше 6, есть название и постер.`,
  })
  @ApiResponse({ type: MovieDtoV1_3 })
  async getRandomMovieV1_3(): Promise<any> {
    return this.movieService.getRandomMovie();
  }

  @Version('1.2')
  @Get('search')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({
    summary: 'Полнотекстовый поиск',
    description: `Этот метод предназначен для полнотекстового поиска тайтлов по текстовому запросу. Он принимает только один параметр \`query\`. Если вам нужны фильтры, гибкость и множество результатов, используйте метод \`Универсальный поиск с фильтрами\` (findMany). В этом методе также не доступен выбор полей. А в ответ приходит упрощенная модель, которая подходит только для отображения результатов поиска.`,
  })
  async searchMovie(@Query() query: SearchDto): Promise<SearchMovieResponseDto> {
    return this.movieService.searchMovie(query);
  }

  @Version('1.1')
  @Get('awards')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Награды тайтлов' })
  @Paginated(MovieAwardDocsResponseDto, MovieAward, { findForAllProperties: true })
  async findManyAwardsByQuery(@Query() query: IQuery): Promise<MovieAwardDocsResponseDto> {
    return this.movieService.findManyAwards(query);
  }

  @Version('1')
  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({
    summary: 'Универсальный поиск с фильтрами',
    description: `Эта версия эндпоинта устарела. Новый в 1.3 версии.`,
    deprecated: true,
  })
  @Paginated(MovieDocsResponseDtoV1, MovieDtoV1, { findForAllProperties: true })
  async findManyByQuery(@Query() query: IQuery): Promise<any> {
    return this.movieService.findMany(query);
  }

  @Version('1')
  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({
    summary: 'Поиск по id',
    description: 'Эта версия эндпоинта устарела. Новый в 1.3 версии.',
    deprecated: true,
  })
  @ApiBaseResponse({ type: MovieDtoV1 })
  @ApiNotFoundResponse({ type: ForbiddenErrorResponseDto, description: 'NotFound' })
  async findOne(@Param('id') id: string): Promise<MovieDtoV1> {
    const found = await this.movieService.findOne(+id);
    if (!found) throw new NotFoundException('По этому id ничего не найдено!');

    return found;
  }

  @Version('1')
  @Get('random')
  @ApiOperation({
    summary: 'Получить рандомный тайтл из базы',
    description: `Этот метод не принимает ни каких параметров, так как выборка в нем уже достаточно релевантная. В него попадают тайтлы не старше 10 лет, рейтинг которых больше 6, есть название и постер.`,
  })
  @ApiResponse({ type: MovieDtoV1 })
  async getRandomMovie(): Promise<MovieDtoV1> {
    return this.movieService.getRandomMovie();
  }

  @Version('1')
  @Get('possible-values-by-field')
  @ApiOperation({
    summary: 'Получить все возможные значения полей',
    description: `Этот метод принимает только определенные поля, и возвращает по ним все доступные значения.`,
  })
  @ApiResponse({ type: PossibleValueDto, isArray: true })
  async getPossibleValuesByFieldName(@Query() dto: GetPossibleValueDto): Promise<PossibleValueDto[]> {
    return this.movieService.getPossibleValuesByFieldName(dto);
  }
}
