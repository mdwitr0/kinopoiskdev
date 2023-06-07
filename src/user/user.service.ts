import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(@InjectModel(User.name) private readonly userRepository: Model<UserDocument>) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  resetRequestsUsed() {
    this.userRepository.updateMany({}, { requestsUsed: 0 });
    this.logger.log('Finish: Reset requests used');
  }
}
