import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { ThrottlerModuleOptions } from '@nestjs/throttler/dist/throttler-module-options.interface';

export const ThrottlerConfig = ThrottlerModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService): ThrottlerModuleOptions => ({
    throttlers: [
      {
        ttl: config.get('THROTTLE_TTL') || 1,
        limit: config.get('THROTTLE_LIMIT') || 50,
      },
    ],
    storage: new ThrottlerStorageRedisService(config.get('REDIS_URL')),
  }),
});
