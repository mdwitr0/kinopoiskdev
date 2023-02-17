import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/common/base/base.service';

import { Season, SeasonDocument } from './schemas/season.schema';

@Injectable()
export class SeasonService extends BaseService<Season> {
  constructor(@InjectModel('seasons') private readonly seasonModel: Model<SeasonDocument>) {
    super(seasonModel);
  }
}
