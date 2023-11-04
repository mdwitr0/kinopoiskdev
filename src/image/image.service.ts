import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/common/base/base.service';

import { Image, ImageDocument } from './schemas/image.schema';
import { ImageRequestDtoV1_4 } from './dto/v1.4/image-request.dto';
import { ImageDocsResponseDtoV1_4 } from './dto/v1.4/image-docs.response.dto';

@Injectable()
export class ImageService extends BaseService<Image> {
  constructor(@InjectModel('images') private readonly imageModel: Model<ImageDocument>) {
    super(imageModel);
  }

  async findManyV1_4(request: ImageRequestDtoV1_4): Promise<ImageDocsResponseDtoV1_4> {
    const filter = request.model2Where();
    const select = request.model2Select();
    const sort = request.model2Sort();
    const { skip, limit } = request.model2Pagination();

    const [total, docs] = await Promise.all([
      this.imageModel.countDocuments(filter),
      this.imageModel.find(filter).sort(sort).limit(limit).skip(skip).select(select).allowDiskUse(true).exec(),
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
