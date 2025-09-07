import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/common/base/base.service';

import { Studio, StudioDocument } from './schemas/studio.schema';
import { StudioDocsResponseDtoV1_4 } from './dto/v1.4/studio-docs.response';
import { StudioRequestDtoV1_4 } from './dto/v1.4/studio-request.dto';

@Injectable()
export class StudioService extends BaseService<Studio> {
  constructor(@InjectModel(Studio.name) private readonly studioModel: Model<StudioDocument>) {
    super(studioModel);
  }

  async findManyV1_4(request: StudioRequestDtoV1_4): Promise<StudioDocsResponseDtoV1_4> {
    const filter = request.model2Where();
    const select = request.model2Select();
    const sort = request.model2Sort();
    const { skip, limit } = request.model2Pagination();

    const [total, docs] = await Promise.all([
      this.studioModel.countDocuments(filter),
      this.studioModel.find(filter).sort(sort).limit(limit).skip(skip).select(select).allowDiskUse(true).exec(),
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
