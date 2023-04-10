import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MeiliSearchModule } from 'nestjs-meilisearch';
import { MeiliService } from './meili.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MeiliSearchModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        host: configService.get<string>('MEILI_HOST'),
        apiKey: configService.get<string>('MEILI_API_KEY'),
      }),
    }),
  ],
  providers: [MeiliService],
  exports: [MeiliService],
})
export class MeiliModule {}
