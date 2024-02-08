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

  constructor(@InjectModel(User.name) private readonly userRepository: Model<UserDocument>, @InjectRedis() private readonly redis: Redis) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async resetRequestsUsedAndCache() {
    this.logger.log('Start: Reset requests used & cache');
    const cursor = this.userRepository.find({ requestsUsed: { $ne: 0 } }).cursor();
    for await (const user of cursor) {
      // @ts-ignore
      const key = ApiKey.toAPIKey(user.token);

      await this.userRepository.updateOne({ _id: user._id }, { requestsUsed: 0 });

      await this.redis.del(key);
    }
    this.logger.log('Finish: Reset requests used & cache');
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async syncDatabases() {
    const users: (UserDocument & { tariffId: TariffDocument })[] = await this.userRepository
      .find()
      .populate('tariffId', 'requestsLimit')
      .select('token')
      .lean();

    // @ts-ignore
    const keys = users.map((user) => ApiKey.toAPIKey(user.token));
    const redisValues = await this.redis.mget(...keys);

    const operations = [];

    users.forEach((user, index) => {
      const redisValue = redisValues[index];

      if (redisValue !== null) {
        const redisValueNumber = Number(redisValue);

        if (isNaN(redisValueNumber)) {
          this.logger.warn(`Can't convert redis value to number for user with token: ${user.token}`);
          return;
        }

        const requestsUsed = user.tariffId.requestsLimit - redisValueNumber;

        operations.push({
          updateOne: { filter: { _id: user._id }, update: { requestsUsed } },
        });
      } else {
        operations.push({
          updateOne: { filter: { _id: user._id }, update: { requestsUsed: 0 } },
        });
      }
    });

    if (operations.length > 0) await this.userRepository.bulkWrite(operations);
  }
}
