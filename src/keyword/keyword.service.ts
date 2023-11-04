import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/common/base/base.service';

import { Keyword, KeywordDocument } from './schemas/keyword.schema';
import { KeywordRequestDtoV1_4 } from './dto/v1.4/keyword-request.dto';
import { KeywordDocsResponseDtoV1_4 } from './dto/v1.4/keyword-docs.response.dto';

@Injectable()
export class KeywordService extends BaseService<Keyword> {
  constructor(@InjectModel(Keyword.name) private readonly keywordModel: Model<KeywordDocument>) {
    super(keywordModel);
  }

  async findManyV1_4(request: KeywordRequestDtoV1_4): Promise<KeywordDocsResponseDtoV1_4> {
    const filter = request.model2Where();
    const select = request.model2Select();
    const sort = request.model2Sort();
    const { skip, limit } = request.model2Pagination();

    const [total, docs] = await Promise.all([
      this.keywordModel.countDocuments(filter),
      this.keywordModel.find(filter).sort(sort).limit(limit).skip(skip).select(select).allowDiskUse(true).exec(),
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
