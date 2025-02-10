import { Get, NotFoundException, Param, Query, UseInterceptors, Version } from '@nestjs/common';
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
import { CacheInterceptor } from '@nestjs/cache-manager';

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
    const found = await this.personService.findOneV1_4(+id);
    if (!found) throw new NotFoundException('По этому id ничего не найдено!');
    return found;
  }

  @Version('1.4')
  @Get()
  @ApiOperation({
    summary: 'Универсальный поиск с фильтрами',
    description: `Этот метод вернет список персон удовлетворяющих вашему запросу. <br> В ответе придут поля указанные в параметре \`selectFields\`. Если его не указать, то вернутся только дефолтные поля.`,
  })
  async findManyV1_4(@Query() request: PersonRequestDtoV1_4): Promise<PersonDocsResponseDtoV1_4> {
    return this.personService.findManyV1_4(request);
  }

  @Version('1.4')
  @Get('search')
  @ApiOperation({
    summary: 'Поиск актеров, режиссеров, и т.д по имени',
    description: `Этот метод вернет список персон которые подходят под ваш запрос.`,
  })
  async searchPersonV1_4(@Query() query: SearchDto): Promise<SearchPersonResponseDtoV1_4> {
    return this.personService.searchPersonV1_4(query);
  }

  @Version('1.4')
  @Get('awards')
  @ApiOperation({ summary: 'Награды актеров' })
  async findManyAwardsV1_4(@Query() request: PersonAwardRequestDtoV1_4): Promise<PersonAwardDocsResponseDto> {
    return this.personService.findManyAwardsV1_4(request);
  }

  @Version('1.2')
  @Get('search')
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
