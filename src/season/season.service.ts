import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/common/base/base.service';

import { Season, SeasonDocument } from './schemas/season.schema';
import { SeasonRequestDtoV1_4 } from './dto/v1.4/season-request.dto';
import { SeasonDocsResponseDtoV1_4 } from './dto/v1.4/season-docs.response.dto';

@Injectable()
export class SeasonService extends BaseService<Season> {
  constructor(@InjectModel('seasons') private readonly seasonModel: Model<SeasonDocument>) {
    super(seasonModel);
  }

  async findManyV1_4(request: SeasonRequestDtoV1_4): Promise<SeasonDocsResponseDtoV1_4> {
    const filter = request.model2Where();
    const select = request.model2Select();
    const sort = request.model2Sort();
    const { skip, limit } = request.model2Pagination();

    const [total, docs] = await Promise.all([
      this.seasonModel.countDocuments(filter),
      this.seasonModel.find(filter).sort(sort).limit(limit).skip(skip).select(select).allowDiskUse(true).exec(),
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
