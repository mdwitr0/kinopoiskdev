import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/common/base/base.service';

import { Studio, StudioDocument } from './schemas/studio.schema';

@Injectable()
export class StudioService extends BaseService<Studio> {
  constructor(@InjectModel(Studio.name) private readonly studioModel: Model<StudioDocument>) {
    super(studioModel);
  }
}
