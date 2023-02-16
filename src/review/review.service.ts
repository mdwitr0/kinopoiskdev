import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/common/base/base.service';

import { Review, ReviewDocument } from './schemas/review.schema';

@Injectable()
export class ReviewService extends BaseService<Review> {
  constructor(
    @InjectModel('reviews') private readonly reviewModel: Model<ReviewDocument>,
  ) {
    super(reviewModel);
  }
}
