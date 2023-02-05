import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  SerializeOptions,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiDotNotationQuery } from '../common/decorators/api-dot-notation-query.decorator';
import { PaginatedQueryDto } from '../common/dto/query/paginated.query.dto';
import { ParseDotNotationQuery } from '../common/pipes/parse-dot-notation-query.pipe';
import { MovieDocsResponseDto } from '../movie/dto/movie-docs.response.dto';
import { Review } from './schemas/review.schema';
import { ReviewDocsResponseDto } from './dto/review-docs-response.dto';
import { FindManyReviewDto } from './dto/find-many-review.dto';

@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludeExtraneousValues: true })
@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  @ApiOperation({ summary: 'Поиск отзывов' })
  @ApiDotNotationQuery(Review)
  @ApiResponse({ type: ReviewDocsResponseDto, isArray: true })
  async finManyByQuery(
    @Query(ParseDotNotationQuery, ValidationPipe) dto: FindManyReviewDto,
  ): Promise<ReviewDocsResponseDto> {
    return this.reviewService.findAll(dto);
  }

  @ApiResponse({ type: ReviewDocsResponseDto, isArray: true })
  @Get(':movieId')
  findOne(@Param('movieId') movieId: string): ReviewDocsResponseDto {
    return this.reviewService.findOne(+movieId);
  }
}
