import { ImageService } from './image.service';
import { ImageDocsResponseDto } from './dto/image-docs.response.dto';
import { Image } from './schemas/image.schema';
import { BaseController } from 'src/common/base/base.controller';
import { Controller } from 'src/common/decorators/controller.decorator';
import { CacheInterceptor, Get, Query, UseInterceptors, Version } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ImageRequestDtoV1_4 } from './dto/v1.4/image-request.dto';
import { ImageDocsResponseDtoV1_4 } from './dto/v1.4/image-docs.response.dto';

@Controller('image', 'Постеры, фоны, кадры, скриншоты и т.д.')
export class ImageController extends BaseController(Image, ImageDocsResponseDto, 'Поиск изображений') {
  constructor(private readonly imageService: ImageService) {
    super(imageService);
  }

  @Version('1.4')
  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({
    summary: 'Поиск картинок',
    description: `Этот метод предназначен для поиска картинок которые привязаны к фильмам и сериалам`,
  })
  async findManyV1_4(@Query() request: ImageRequestDtoV1_4): Promise<ImageDocsResponseDtoV1_4> {
    return this.imageService.findManyV1_4(request);
  }
}
