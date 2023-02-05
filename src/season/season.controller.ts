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
import { SeasonService } from './season.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiDotNotationQuery } from '../common/decorators/api-dot-notation-query.decorator';
import { PaginatedQueryDto } from '../common/dto/query/paginated.query.dto';
import { MovieDocsResponseDto } from '../movie/dto/movie-docs.response.dto';
import { ParseDotNotationQuery } from '../common/pipes/parse-dot-notation-query.pipe';
import { Season } from './schemas/season.schema';
import { FindManySeasonDto } from './dto/find-many-season.dto';
import { SeasonDocsResponseDto } from './dto/season-docs.response.dto';
import { Movie } from '../movie/schemas/movie.schema';

@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludeExtraneousValues: true })
@ApiTags('Season')
@Controller('season')
export class SeasonController {
  constructor(private readonly seasonService: SeasonService) {}

  @Get()
  @ApiOperation({ summary: 'Поиск сезонов' })
  @ApiDotNotationQuery(Season)
  @ApiResponse({ type: SeasonDocsResponseDto, isArray: true })
  async finManyByQuery(
    @Query(ParseDotNotationQuery, ValidationPipe) dto: FindManySeasonDto,
  ): Promise<SeasonDocsResponseDto> {
    return this.seasonService.findAll(dto);
  }

  @ApiResponse({ type: SeasonDocsResponseDto, isArray: true })
  @Get(':movieId')
  findOne(@Param('movieId') movieId: string): SeasonDocsResponseDto {
    return this.seasonService.findOne(+movieId);
  }
}
