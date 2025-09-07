import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Cron, CronExpression } from '@nestjs/schedule';
import Redis from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { TariffDocument } from './schemas/tariff.schema';
import * as ApiKey from 'uuid-apikey';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private readonly userRepository: Model<UserDocument>,
    @InjectRedis() private readonly redis: Redis,
  ) {
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async resetRequestsUsedAndCache() {
    this.logger.log('Start: Reset requests used & cache');
    const cursor = this.userRepository.find({}).cursor();
    for await (const user of cursor) {
      // @ts-ignore
      const key = ApiKey.toAPIKey(user.token);

      await this.redis.del(key);
    }
    this.logger.log('Finish: Reset requests used & cache');
  }
}
