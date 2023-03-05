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

@Controller('person', 'Актеры, режиссеры, операторы, и т.д')
export class PersonController extends BaseControllerWithFindById(Person, PersonDocsResponseDto, 'Поиск персон') {
  constructor(private readonly personService: PersonService) {
    super(personService);
  }

  @Version('1.1')
  @Get('awards')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Наград актеров' })
  @Paginated(PersonAwardDocsResponseDto, PersonAward, { findForAllProperties: true })
  async findManyAwardsByQuery(@Query() query: IQuery): Promise<PersonAwardDocsResponseDto> {
    console.log(query);
    return this.service.findManyAwards(query);
  }
}
