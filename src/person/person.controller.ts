import { FindManyPersonDto } from './dto/find-many-person.dto';
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
import { PersonService } from './person.service';
import { ApiDotNotationQuery } from '../common/decorators/api-dot-notation-query.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParseDotNotationQuery } from '../common/pipes/parse-dot-notation-query.pipe';
import { PaginatedQueryDto } from '../common/dto/query/paginated.query.dto';
import { PersonDocsResponseDto } from './dto/person-docs.response.dto';
import { Person } from './schemas/person.schema';
import { ToolsQueryDto } from '../common/dto/query/tools.query.dto';
import { IQuery } from 'src/common/interfaces/query.interface';

@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludeExtraneousValues: true })
@ApiTags('Person')
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  @ApiOperation({ summary: 'Поиск персон' })
  @ApiDotNotationQuery(ToolsQueryDto, PaginatedQueryDto, Person)
  @ApiResponse({ type: PersonDocsResponseDto })
  async finManyByQuery(@Query() query: IQuery) {
    return this.personService.findMany(query);
  }

  @ApiResponse({ type: Person })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(+id);
  }
}
