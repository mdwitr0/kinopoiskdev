import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { redisStore } from 'cache-manager-redis-store';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';

export const ThrottlerConfig = ThrottlerModule.forRoot({
  ttl: 1,
  limit: 50,
  storage: new ThrottlerStorageRedisService('redis://default:i1fuhqble1@89.19.211.107:6379'),
});
