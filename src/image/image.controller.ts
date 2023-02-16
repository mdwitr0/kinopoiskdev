import {
  Controller,
  Get,
  Param,
  Query,
  SerializeOptions,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiDotNotationQuery } from '../common/decorators/api-dot-notation-query.decorator';
import { FindManyImageDto } from './dto/find-many-image.dto';
import { ImageService } from './image.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParseDotNotationQuery } from '../common/pipes/parse-dot-notation-query.pipe';
import { PaginatedQueryDto } from '../common/dto/query/paginated.query.dto';
import { ImageDocsResponseDto } from './dto/image-docs.response.dto';
import { Image } from './schemas/image.schema';
import { ToolsQueryDto } from '../common/dto/query/tools.query.dto';
import { IQuery } from 'src/common/interfaces/query.interface';
import { QueryPipe } from 'src/common/pipes/query.pipe';
@SerializeOptions({ excludeExtraneousValues: true })
@ApiTags('Image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  @UsePipes(new QueryPipe())
  @ApiOperation({ summary: 'Поиск изображений' })
  @ApiDotNotationQuery(ToolsQueryDto, PaginatedQueryDto, Image)
  @ApiResponse({ type: ImageDocsResponseDto, isArray: true })
  async finManyByQuery(@Query() query: IQuery) {
    return this.imageService.findMany(query);
  }

  @ApiResponse({ type: ImageDocsResponseDto, isArray: true })
  @Get(':movieId')
  findOne(@Param('movieId') movieId: string) {
    return this.imageService.findOne(+movieId);
  }
}
