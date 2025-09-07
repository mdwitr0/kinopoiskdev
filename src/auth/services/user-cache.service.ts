import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { CachedUser, UserWithTariff } from '../interfaces/cached-user.interface';

@Injectable()
export class UserCacheService {
  private readonly USER_CACHE_PREFIX = 'user:';
  private readonly CACHE_TTL = 3600; // 1 hour

  constructor(@InjectRedis() private readonly redis: Redis) {}

  async getUser(tokenUuid: string): Promise<CachedUser | null> {
    const cacheKey = this.getUserCacheKey(tokenUuid);
    const cachedData = await this.redis.get(cacheKey);

    if (!cachedData) {
      return null;
    }

    try {
      return JSON.parse(cachedData);
    } catch (error) {
      await this.redis.del(cacheKey);
      return null;
    }
  }

  async setUser(tokenUuid: string, user: UserWithTariff): Promise<void> {
    const cachedUser: CachedUser = {
      _id: user._id.toString(),
      token: user.token,
      userId: user.userId,
      username: user.username,
      password: user.password,
      email: user.email,
      requestsUsed: user.requestsUsed,
      inChat: user.inChat,
      isSubscribed: user.isSubscribed,
      subscriptionStartDate: user.subscriptionStartDate,
      subscriptionEndDate: user.subscriptionEndDate,
      tariffName: user.tariffId.name,
      requestsLimit: user.tariffId.requestsLimit,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    const cacheKey = this.getUserCacheKey(tokenUuid);
    await this.redis.setex(cacheKey, this.CACHE_TTL, JSON.stringify(cachedUser));
  }

  async deleteUser(tokenUuid: string): Promise<void> {
    const cacheKey = this.getUserCacheKey(tokenUuid);
    await this.redis.del(cacheKey);
  }

  async refreshUser(tokenUuid: string): Promise<void> {
    const cacheKey = this.getUserCacheKey(tokenUuid);
    await this.redis.expire(cacheKey, this.CACHE_TTL);
  }

  private getUserCacheKey(tokenUuid: string): string {
    return `${this.USER_CACHE_PREFIX}${tokenUuid}`;
  }

  convertCachedUserToUserWithTariff(cachedUser: CachedUser): UserWithTariff {
    return {
      _id: cachedUser._id,
      token: cachedUser.token,
      userId: cachedUser.userId,
      username: cachedUser.username,
      password: cachedUser.password,
      email: cachedUser.email,
      requestsUsed: cachedUser.requestsUsed,
      inChat: cachedUser.inChat,
      isSubscribed: cachedUser.isSubscribed,
      subscriptionStartDate: cachedUser.subscriptionStartDate,
      subscriptionEndDate: cachedUser.subscriptionEndDate,
      tariffId: {
        _id: '', // Will be filled if needed
        name: cachedUser.tariffName,
        requestsLimit: cachedUser.requestsLimit,
        price: 0, // Will be filled if needed
      },
      createdAt: cachedUser.createdAt,
      updatedAt: cachedUser.updatedAt,
    };
  }
}
