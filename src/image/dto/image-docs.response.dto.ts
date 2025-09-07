import { PartialType } from '@nestjs/swagger';
import { AbstractDocsResponseDto } from '../../common/dto/abstract/abstract-docs.response.dto';
import { Image } from '../schemas/image.schema';

export class ImageDocsResponseDto extends AbstractDocsResponseDto(Image) {
  constructor(partial: Partial<ImageDocsResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
