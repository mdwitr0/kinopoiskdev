import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';

export const ThrottlerConfig = ThrottlerModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    ttl: config.get('THROTTLE_TTL') || 1,
    limit: config.get('THROTTLE_LIMIT') || 50,
    storage: new ThrottlerStorageRedisService(config.get('REDIS_URL')),
  }),
});
