import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { List, ListDocument } from './schemas/list.schema';
import { ListRequestDtoV1_4 } from './dto/v1.4/list-request.dto';
import { ListDocsResponseDtoV1_4 } from './dto/v1.4/list-docs.response.dto';

@Injectable()
export class ListService {
  constructor(@InjectModel('list') private readonly listModel: Model<ListDocument>) {}

  async findManyV1_4(request: ListRequestDtoV1_4): Promise<ListDocsResponseDtoV1_4> {
    const filter = request.model2Where();
    const select = request.model2Select();
    const sort = request.model2Sort();
    const { skip, limit } = request.model2Pagination();

    const [total, docs] = await Promise.all([
      this.listModel.countDocuments(filter),
      this.listModel.find(filter).sort(sort).limit(limit).skip(skip).select(select).allowDiskUse(true).exec(),
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

  async findOneV1_4(slug: string): Promise<List> {
    const list = await this.listModel.findOne({ slug }).lean();
    if (!list) {
      throw new NotFoundException();
    }

    return list;
  }
}
