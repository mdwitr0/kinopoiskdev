import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { SeasonService } from './season.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiDotNotationQuery } from '../common/decorators/api-dot-notation-query.decorator';
import { PaginatedQueryDto } from '../common/dto/query/paginated.query.dto';
import { Season } from './schemas/season.schema';
import { SeasonDocsResponseDto } from './dto/season-docs.response.dto';
import { ToolsQueryDto } from '../common/dto/query/tools.query.dto';
import { IQuery } from 'src/common/interfaces/query.interface';

@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludeExtraneousValues: true })
@ApiTags('Season')
@Controller('season')
export class SeasonController {
  constructor(private readonly seasonService: SeasonService) {}

  @Get()
  @ApiOperation({ summary: 'Поиск сезонов' })
  @ApiDotNotationQuery(ToolsQueryDto, PaginatedQueryDto, Season)
  @ApiResponse({ type: SeasonDocsResponseDto, isArray: true })
  async finManyByQuery(@Query() query: IQuery) {
    return this.seasonService.findMany(query);
  }

  @ApiResponse({ type: SeasonDocsResponseDto, isArray: true })
  @Get(':movieId')
  findOne(@Param('movieId') movieId: string) {
    return this.seasonService.findOne(+movieId);
  }
}
