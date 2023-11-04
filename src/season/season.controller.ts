import { Controller } from 'src/common/decorators/controller.decorator';
import { Season } from './schemas/season.schema';
import { SeasonService } from './season.service';
import { Get, Query, UseInterceptors, Version } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiOperation } from '@nestjs/swagger';
import { Paginated } from '../common/decorators/paginated.decorator';
import { IQuery } from '../common/interfaces/query.interface';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { SeasonDocsResponseDtoV1 } from './dto/v1/season-docs.response.dto';
import { SeasonDocsResponseDtoV1_4 } from './dto/v1.4/season-docs.response.dto';
import { SeasonRequestDtoV1_4 } from './dto/v1.4/season-request.dto';

@Controller('season', 'Сезоны и эпизоды')
export class SeasonController {
  constructor(private readonly service: SeasonService) {}

  @Version('1')
  @Get()
  @UseInterceptors(CacheInterceptor)
  @Paginated(SeasonDocsResponseDtoV1, Season, { findForAllProperties: true })
  @ApiExcludeEndpoint()
  async findManyByQueryV1(@Query() query: IQuery): Promise<SeasonDocsResponseDtoV1> {
    return this.service.findMany(query);
  }

  @Version('1.4')
  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Поиск сезонов' })
  async findManyV1_4(@Query() request: SeasonRequestDtoV1_4): Promise<SeasonDocsResponseDtoV1_4> {
    return this.service.findManyV1_4(request);
  }
}
