import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/common/base/base.service';

import { Image, ImageDocument } from './schemas/image.schema';

@Injectable()
export class ImageService extends BaseService<Image> {
  constructor(@InjectModel('images') private readonly imageModel: Model<ImageDocument>) {
    super(imageModel);
  }
}
