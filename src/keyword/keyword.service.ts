import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/common/base/base.service';

import { Keyword, KeywordDocument } from './schemas/keyword.schema';

@Injectable()
export class KeywordService extends BaseService<Keyword> {
  constructor(@InjectModel(Keyword.name) private readonly keywordModel: Model<KeywordDocument>) {
    super(keywordModel);
  }
}
