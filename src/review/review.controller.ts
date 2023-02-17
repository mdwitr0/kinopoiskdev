import { ReviewService } from './review.service';
import { Review } from './schemas/review.schema';
import { ReviewDocsResponseDto } from './dto/review-docs-response.dto';

import { BaseController } from 'src/common/base/base.controller';
import { Controller } from 'src/common/decorators/controller.decorator';

@Controller('review', 'Отзывы пользователей')
export class ReviewController extends BaseController(Review, ReviewDocsResponseDto, 'Поиск отзывов') {
  constructor(private readonly reviewService: ReviewService) {
    super(reviewService);
  }
}
