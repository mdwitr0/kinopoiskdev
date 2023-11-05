import { BaseControllerWithFindById } from 'src/common/base/base.controller';
import { Controller } from 'src/common/decorators/controller.decorator';
import { StudioDocsResponseDto } from './dto/studio-docs-response.dto';
import { Studio } from './schemas/studio.schema';
import { StudioService } from './studio.service';
import { CacheInterceptor, Get, Query, UseInterceptors, Version } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { StudioRequestDtoV1_4 } from './dto/v1.4/studio-request.dto';
import { StudioDocsResponseDtoV1_4 } from './dto/v1.4/studio-docs.response';

@Controller('studio', 'Студии')
export class StudioController extends BaseControllerWithFindById(Studio, StudioDocsResponseDto, 'Поиск студий') {
  constructor(private readonly studioService: StudioService) {
    super(studioService);
  }

  @Version('1.4')
  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({
    summary: 'Поиск студий',
    description: `Этот метод предназначен для поиска студий`,
  })
  async findManyV1_4(@Query() request: StudioRequestDtoV1_4): Promise<StudioDocsResponseDtoV1_4> {
    return this.studioService.findManyV1_4(request);
  }
}
