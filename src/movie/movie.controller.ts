import { MovieService } from './movie.service';
import { MovieDocsResponseDtoV1 } from './dto/v1/movie-docs.response.dto';

import { Controller } from 'src/common/decorators/controller.decorator';
import { Get, NotFoundException, Param, Query, UseInterceptors, Version } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiNotFoundResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
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
import { MovieDtoV1_4 } from './dto/v1.4/movie.dto';
import { SearchMovieResponseDtoV1_4 } from './dto/v1.4/search-movie.response.dto';
import { MovieRequestDtoV1_4 } from './dto/v1.4/movie-request.dto';
import { MovieDocsResponseDtoV1_4 } from './dto/v1.4/movie-docs.response.dto';
import { MovieAwardRequestDtoV1_4 } from './dto/v1.4/movie-award-request.dto';

@Controller('movie', 'Фильмы, сериалы, и т.д.')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Version('1.4')
  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Поиск по id', description: 'Возвращает всю доступную информацию о сущности.' })
  @ApiBaseResponse({ type: MovieDtoV1_4 })
  @ApiNotFoundResponse({ type: ForbiddenErrorResponseDto, description: 'NotFound' })
  async findOneV1_4(@Param('id') id: string): Promise<MovieDtoV1_4> {
    const found = await this.movieService.findOneV1_4(+id);
    if (!found) throw new NotFoundException('По этому id ничего не найдено!');
    return found;
  }

  @Version('1.4')
  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({
    summary: 'Универсальный поиск с фильтрами',
    description: `В этом методе вы можете составить запрос на получение фильма любой сложности.
  \nДля этого используете значения представленные ниже. Вы можете комбинировать поля, так же указывать множественные и специальные значения полей! 
  \nОбратите внимание, что этот метод возвращает множество результатов, поэтому по-умолчанию будет возвращены только определенные поля.
  \nЧтобы получить нужные вам поля, даже если его нет в ответе по-умолчанию используйте параметр \`selectFields\` `,
  })
  async findManyByQueryV1_4(@Query() query: MovieRequestDtoV1_4): Promise<MovieDocsResponseDtoV1_4> {
    return this.movieService.findManyV1_4(query);
  }

  @Version('1.4')
  @Get('search')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({
    summary: 'Поиск по названиям',
    description: `Этот метод предназначен для поиска тайтлов по текстовому запросу. Он ищет по названиям фильмов на всех языках мира, так же в запрос можено указать год, и тогда поиск будет производиться по названиям и году выпуска.`,
  })
  async searchMovieV1_4(@Query() query: SearchDto): Promise<SearchMovieResponseDtoV1_4> {
    return this.movieService.searchMovieV1_4(query);
  }

  @Version('1.4')
  @Get('random')
  @ApiOperation({
    summary: 'Получить рандомный тайтл из базы',
    description: `Этот метод возвращает рандомный тайтл из базы. Вы можете указать параметры поиска, и тогда рандомный тайтл будет выбран из тех, что подходят под эти параметры.`,
  })
  async getRandomMovieV1_4(@Query() query: MovieRequestDtoV1_4): Promise<MovieDtoV1_4> {
    return this.movieService.getRandomMovieV1_4(query);
  }

  @Version('1.4')
  @Get('awards')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Награды тайтлов' })
  async findManyAwardsV1_4(@Query() request: MovieAwardRequestDtoV1_4): Promise<MovieAwardDocsResponseDto> {
    return this.movieService.findManyAwardsV1_4(request);
  }

  @Version('1.3')
  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiExcludeEndpoint()
  @Paginated(MovieDocsResponseDtoV1_3, MovieDtoV1_3, { findForAllProperties: true })
  async findManyByQueryV1_3(@Query() query: IQuery): Promise<MovieDocsResponseDtoV1> {
    return this.movieService.findMany(query);
  }

  @Version('1.3')
  @Get(':id')
  @ApiExcludeEndpoint()
  @UseInterceptors(CacheInterceptor)
  async findOneV1_3(@Param('id') id: string): Promise<any> {
    const found = await this.movieService.findOne(+id);
    if (!found) throw new NotFoundException('По этому id ничего не найдено!');
    // ts-ignore
    return found;
  }

  @Version('1.3')
  @Get('random')
  @ApiExcludeEndpoint()
  async getRandomMovieV1_3(): Promise<any> {
    return this.movieService.getRandomMovie();
  }

  @Version('1.2')
  @Get('search')
  @UseInterceptors(CacheInterceptor)
  @ApiExcludeEndpoint()
  async searchMovie(@Query() query: SearchDto): Promise<SearchMovieResponseDto> {
    return this.movieService.searchMovie(query);
  }

  @Version('1.1')
  @Get('awards')
  @UseInterceptors(CacheInterceptor)
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Награды тайтлов' })
  @Paginated(MovieAwardDocsResponseDto, MovieAward, { findForAllProperties: true })
  async findManyAwardsByQuery(@Query() query: IQuery): Promise<MovieAwardDocsResponseDto> {
    return this.movieService.findManyAwards(query);
  }

  @Version('1')
  @Get()
  @UseInterceptors(CacheInterceptor)
  @Paginated(MovieDocsResponseDtoV1, MovieDtoV1, { findForAllProperties: true })
  @ApiExcludeEndpoint()
  async findManyByQuery(@Query() query: IQuery): Promise<any> {
    return this.movieService.findMany(query);
  }

  @Version('1')
  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  @ApiExcludeEndpoint()
  async findOne(@Param('id') id: string): Promise<MovieDtoV1> {
    const found = await this.movieService.findOne(+id);
    if (!found) throw new NotFoundException('По этому id ничего не найдено!');

    return found;
  }

  @Version('1')
  @Get('random')
  @ApiExcludeEndpoint()
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
