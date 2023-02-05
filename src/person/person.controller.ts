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

@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludeExtraneousValues: true })
@ApiTags('Person')
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  @ApiOperation({ summary: 'Поиск персон' })
  @ApiDotNotationQuery(Person, PaginatedQueryDto)
  @ApiResponse({ type: PersonDocsResponseDto })
  async finManyByQuery(
    @Query(ParseDotNotationQuery, ValidationPipe) dto: FindManyPersonDto,
  ): Promise<PersonDocsResponseDto> {
    return this.personService.findMany(dto);
  }

  @ApiResponse({ type: Person })
  @Get(':id')
  findOne(@Param('id') id: string): Person {
    return this.personService.findOne(+id);
  }
}
