import { ReviewService } from './review.service';
import { Review } from './schemas/review.schema';
import { ReviewDocsResponseDto } from './dto/review-docs-response.dto';

import { BaseController } from 'src/common/base/base.controller';
import { Controller } from 'src/common/decorators/controller.decorator';
import { CacheInterceptor, Get, Query, UseInterceptors, Version } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ReviewRequestDtoV1_4 } from './dto/v1.4/review-request.dto';
import { ReviewDocsResponseDtoV1_4 } from './dto/v1.4/review-docs.response';

@Controller('review', 'Отзывы пользователей')
export class ReviewController extends BaseController(Review, ReviewDocsResponseDto, 'Поиск отзывов') {
  constructor(private readonly reviewService: ReviewService) {
    super(reviewService);
  }

  @Version('1.4')
  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({
    summary: 'Универсальный поиск с фильтрами',
    description: `Этот метод предназначен для поиска персон по фильтрам. Он принимает множество параметров, которые можно комбинировать между собой. Если вам нужен только поиск по имени, используйте метод \`Полнотекстовый поиск\` (search). В этом методе также доступен выбор полей. А в ответ приходит полная модель персоны.`,
  })
  async findManyV1_4(@Query() request: ReviewRequestDtoV1_4): Promise<ReviewDocsResponseDtoV1_4> {
    return this.reviewService.findManyV1_4(request);
  }
}
