import { ImageDocsResponseDto } from '../image-docs.response.dto';

export class ImageDocsResponseDtoV1_4 extends ImageDocsResponseDto {
  constructor(partial: Partial<ImageDocsResponseDtoV1_4>) {
    super(partial);
    Object.assign(this, partial);
  }
}
