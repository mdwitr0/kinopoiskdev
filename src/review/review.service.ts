import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/common/base/base.service';

import { Review, ReviewDocument } from './schemas/review.schema';
import { ReviewRequestDtoV1_4 } from './dto/v1.4/review-request.dto';
import { ReviewDocsResponseDtoV1_4 } from './dto/v1.4/review-docs.response';

@Injectable()
export class ReviewService extends BaseService<Review> {
  private readonly logger = new Logger();
  constructor(@InjectModel('reviews') private readonly reviewModel: Model<ReviewDocument>) {
    super(reviewModel);
  }

  async findManyV1_4(request: ReviewRequestDtoV1_4): Promise<ReviewDocsResponseDtoV1_4> {
    const filter = request.model2Where();
    const select = request.model2Select();
    const sort = request.model2Sort();
    const { skip, limit } = request.model2Pagination();

    this.logger.debug('reviews filter', { filter });

    const [total, docs] = await Promise.all([
      this.reviewModel.countDocuments(filter),
      this.reviewModel.find(filter).sort(sort).limit(limit).skip(skip).select(select).allowDiskUse(true).exec(),
    ]);

    const docsToJson = docs.map((doc) => doc?.toJSON());
    return {
      docs: docsToJson,
      total,
      limit: request.limit,
      page: skip / limit + 1,
      pages: Math.ceil(total / limit),
    };
  }
}
