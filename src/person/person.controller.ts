import { CacheInterceptor, Get, NotFoundException, Param, Query, UseInterceptors, Version } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiNotFoundResponse, ApiOperation } from '@nestjs/swagger';
import { BaseControllerWithFindById } from 'src/common/base/base.controller';
import { Controller } from 'src/common/decorators/controller.decorator';
import { Paginated } from 'src/common/decorators/paginated.decorator';
import { IQuery } from 'src/common/interfaces/query.interface';
import { PersonAwardDocsResponseDto } from './dto/person-award-docs.response.dto';
import { PersonDocsResponseDto } from './dto/person-docs.response';
import { PersonService } from './person.service';
import { PersonAward } from './schemas/person-award.schema';
import { Person } from './schemas/person.schema';
import { SearchDto } from 'src/common/dto/query/search.dto';
import { SearchPersonResponseDto } from './dto/search-person.response.dto';
import { SearchPersonResponseDtoV1_4 } from './dto/v1.4/search-person.response.dto';
import { PersonRequestDtoV1_4 } from './dto/v1.4/person-request.dto';
import { PersonDocsResponseDtoV1_4 } from './dto/v1.4/person-docs.response';
import { ApiBaseResponse } from '../common/decorators/api-base-response.decorator';
import { ForbiddenErrorResponseDto } from '../common/dto/errors/forbidden-error.response.dto';
import { PersonAwardRequestDtoV1_4 } from './dto/v1.4/person-award-request.dto';
import { PersonFindOneParamsDtoV1_4 } from './dto/v1.4/person-find-one-params.dto';

@Controller('person', 'Актеры, режиссеры, операторы, и т.д')
export class PersonController extends BaseControllerWithFindById(Person, PersonDocsResponseDto, 'Универсальный поиск персон с фильтрами') {
  constructor(private readonly personService: PersonService) {
    super(personService);
  }

  @Version('1.4')
  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Поиск по id', description: 'Возвращает всю доступную информацию о сущности.' })
  @ApiBaseResponse({ type: Person })
  @ApiNotFoundResponse({ type: ForbiddenErrorResponseDto, description: 'NotFound' })
  async findOneV1_4(@Param() { id }: PersonFindOneParamsDtoV1_4): Promise<Person> {
    const found = await this.personService.findOne(+id);
    if (!found) throw new NotFoundException('По этому id ничего не найдено!');
    return found;
  }

  @Version('1.4')
  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({
    summary: 'Универсальный поиск с фильтрами',
    description: `Этот метод предназначен для поиска персон по фильтрам. Он принимает множество параметров, которые можно комбинировать между собой. Если вам нужен только поиск по имени, используйте метод \`Полнотекстовый поиск\` (search). В этом методе также доступен выбор полей. А в ответ приходит полная модель персоны.`,
  })
  async findManyV1_4(@Query() request: PersonRequestDtoV1_4): Promise<PersonDocsResponseDtoV1_4> {
    return this.personService.findManyV1_4(request);
  }

  @Version('1.4')
  @Get('search')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({
    summary: 'Полнотекстовый поиск',
    description: `Этот метод предназначен для полнотекстового поиска персон по текстовому запросу. Он принимает только один параметр \`query\`. Если вам нужны фильтры, гибкость и множество результатов, используйте метод \`Универсальный поиск с фильтрами\` (findMany). В этом методе также не доступен выбор полей. А в ответ приходит упрощенная модель, которая подходит только для отображения результатов поиска.`,
  })
  async searchPersonV1_4(@Query() query: SearchDto): Promise<SearchPersonResponseDtoV1_4> {
    return this.personService.searchPersonV1_4(query);
  }

  @Version('1.4')
  @Get('awards')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Награды актеров' })
  async findManyAwardsV1_4(@Query() request: PersonAwardRequestDtoV1_4): Promise<PersonAwardDocsResponseDto> {
    return this.personService.findManyAwardsV1_4(request);
  }

  @Version('1.2')
  @Get('search')
  @UseInterceptors(CacheInterceptor)
  @ApiExcludeEndpoint()
  async searchPerson(@Query() query: SearchDto): Promise<SearchPersonResponseDto> {
    return this.service.searchPerson(query);
  }

  @Version('1.1')
  @Get('awards')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Награды актеров' })
  @ApiExcludeEndpoint()
  @Paginated(PersonAwardDocsResponseDto, PersonAward, { findForAllProperties: true })
  async findManyAwardsByQuery(@Query() query: IQuery): Promise<PersonAwardDocsResponseDto> {
    console.log(query);
    return this.service.findManyAwards(query);
  }
}
