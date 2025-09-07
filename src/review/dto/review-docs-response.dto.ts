import { PartialType } from '@nestjs/swagger';
import { AbstractDocsResponseDto } from '../../common/dto/abstract/abstract-docs.response.dto';
import { Review } from '../schemas/review.schema';

export class ReviewDocsResponseDto extends AbstractDocsResponseDto(Review) {
  constructor(partial: Partial<ReviewDocsResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
