/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TariffDocument } from 'src/user/schemas/tariff.schema';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import * as ApiKey from 'uuid-apikey';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userRepository: Model<UserDocument>,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async findUserByToken(token: string): Promise<UserDocument & { tariffId: TariffDocument }> {
    // @ts-ignore
    const tokenUuid = ApiKey.toUUID(token);
    const user: UserDocument & { tariffId: TariffDocument } = await this.userRepository
      .findOne({ token: tokenUuid })
      .populate('tariffId')
      .lean();

    if (user) return user;
    return null;
  }

  async checkAndDecreaseLimit(token: string) {
    let limit: string = await this.redis.get(token);

    if (!limit) {
      limit = await this.setLimit(token);
    }

    if (Number(limit) <= 0) {
      return false;
    } else {
      await this.redis.decr(token);
      return true;
    }
  }

  async setLimit(token) {
    const user = await this.findUserByToken(token);
    // @ts-ignore
    const key = ApiKey.toAPIKey(user.token);
    const limit = user.tariffId.requestsLimit;

    await this.redis.set(key, limit);

    return String(limit);
  }
}
