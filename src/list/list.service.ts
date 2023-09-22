import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/common/base/base.service';

import { List, ListDocument } from './schemas/list.schema';

@Injectable()
export class ListService extends BaseService<List> {
  constructor(@InjectModel('list') private readonly listModel: Model<ListDocument>) {
    super(listModel);
  }
}
