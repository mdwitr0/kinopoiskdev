import { ListService } from './list.service';
import { Controller } from 'src/common/decorators/controller.decorator';
import { Get, Param, Query, UseInterceptors, Version } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ListRequestDtoV1_4 } from './dto/v1.4/list-request.dto';
import { ListDocsResponseDtoV1_4 } from './dto/v1.4/list-docs.response.dto';
import { List } from './schemas/list.schema';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('list', 'Коллекции кино')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Version('1.4')
  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({
    summary: 'Поиск коллекций',
    description: `Этот метод предназначен для поиска коллекций кино`,
  })
  async findManyV1_4(@Query() request: ListRequestDtoV1_4): Promise<ListDocsResponseDtoV1_4> {
    return this.listService.findManyV1_4(request);
  }

  @Version('1.4')
  @Get(':slug')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({
    summary: 'Поиск коллекции по slug',
    description: `Этот метод предназначен для поиска коллекции кино по slug`,
  })
  async findOneV1_4(@Param('slug') slug: string): Promise<List> {
    return this.listService.findOneV1_4(slug);
  }
}
