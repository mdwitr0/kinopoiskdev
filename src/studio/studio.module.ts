import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Studio, StudioSchema } from './schemas/studio.schema';
import { StudioController } from './studio.controller';
import { StudioService } from './studio.service';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      // @ts-ignore
      useFactory: async (configService: ConfigService) => ({
        isGlobal: true,
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        ttl: configService.get('CACHE_TTL'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Studio.name, schema: StudioSchema }]),
  ],
  controllers: [StudioController],
  providers: [StudioService],
})
export class StudioModule {}
