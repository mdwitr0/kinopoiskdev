import { CacheInterceptor, Get, Query, UseInterceptors, Version } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
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

@Controller('person', 'Актеры, режиссеры, операторы, и т.д')
export class PersonController extends BaseControllerWithFindById(
  Person,
  PersonDocsResponseDto,
  'Универсальный поиск персон с фильтрами',
) {
  constructor(private readonly personService: PersonService) {
    super(personService);
  }

  @Version('1.2')
  @Get('search')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({
    summary: 'Полнотекстовый поиск',
    description: `Этот метод предназначен для полнотекстового поиска персон по текстовому запросу. Он принимает только один параметр \`query\`. Если вам нужны фильтры, гибкость и множество результатов, используйте метод \`Универсальный поиск с фильтрами\` (findMany). В этом методе также не доступен выбор полей. А в ответ приходит упрощенная модель, которая подходит только для отображения результатов поиска.`,
  })
  async searchPerson(@Query() query: SearchDto): Promise<SearchPersonResponseDto> {
    const data = await this.service.searchPerson(query);
    return data;
  }

  @Version('1.1')
  @Get('awards')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Награды актеров' })
  @Paginated(PersonAwardDocsResponseDto, PersonAward, { findForAllProperties: true })
  async findManyAwardsByQuery(@Query() query: IQuery): Promise<PersonAwardDocsResponseDto> {
    console.log(query);
    return this.service.findManyAwards(query);
  }
}
