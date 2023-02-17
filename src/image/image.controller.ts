import { ImageService } from './image.service';
import { ImageDocsResponseDto } from './dto/image-docs.response.dto';
import { Image } from './schemas/image.schema';
import { BaseController } from 'src/common/base/base.controller';
import { Controller } from 'src/common/decorators/controller.decorator';

@Controller('image', 'Постеры, фоны, кадры, скриншоты и т.д.')
export class ImageController extends BaseController(
  Image,
  ImageDocsResponseDto,
  'Поиск отзывов',
) {
  constructor(private readonly imageService: ImageService) {
    super(imageService);
  }
}
