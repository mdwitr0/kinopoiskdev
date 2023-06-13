import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

export const CacheConfig = CacheModule.registerAsync({
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    ttl: configService.get('CACHE_TTL'),
    store: (await redisStore({
      url: configService.get('REDIS_URL'),
    })) as unknown as CacheStore,
  }),
  inject: [ConfigService],
});
