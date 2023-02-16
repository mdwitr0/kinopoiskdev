import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Query,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiDotNotationQuery } from '../common/decorators/api-dot-notation-query.decorator';
import { PaginatedQueryDto } from '../common/dto/query/paginated.query.dto';
import { Review } from './schemas/review.schema';
import { ReviewDocsResponseDto } from './dto/review-docs-response.dto';
import { ToolsQueryDto } from '../common/dto/query/tools.query.dto';
import { IQuery } from 'src/common/interfaces/query.interface';

@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludeExtraneousValues: true })
@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  @ApiOperation({ summary: 'Поиск отзывов' })
  @ApiDotNotationQuery(ToolsQueryDto, PaginatedQueryDto, Review)
  @ApiResponse({ type: ReviewDocsResponseDto, isArray: true })
  async finManyByQuery(@Query() query: IQuery) {
    return this.reviewService.findMany(query);
  }

  @ApiResponse({ type: ReviewDocsResponseDto, isArray: true })
  @Get(':movieId')
  findOne(@Param('movieId') movieId: string) {
    return this.reviewService.findOne(+movieId);
  }
}
