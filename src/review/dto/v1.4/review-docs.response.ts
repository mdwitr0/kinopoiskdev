import { ReviewDocsResponseDto } from '../review-docs-response.dto';

export class ReviewDocsResponseDtoV1_4 extends ReviewDocsResponseDto {
  constructor(partial: Partial<ReviewDocsResponseDtoV1_4>) {
    super(partial);
    Object.assign(this, partial);
  }
}
