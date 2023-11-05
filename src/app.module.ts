import { DynamicModule, Logger, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SeasonModule } from './season/season.module';
import { ReviewModule } from './review/review.module';
import { PersonModule } from './person/person.module';
import { ImageModule } from './image/image.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StudioModule } from './studio/studio.module';
import { KeywordModule } from './keyword/keyword.module';
import { MeiliSearchModule } from 'nestjs-meilisearch';
import { SearchSyncModule } from './search-sync/search-sync.module';
import { AppController } from './app.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from './user/user.module';
import { ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CacheConfig } from './common/configs/cache.config';
import { ThrottlerConfig } from './common/configs/throttler.config';
import { RedisConfig } from './common/configs/redis.config';
import { ScheduleModule } from '@nestjs/schedule';
import { ListModule } from './list/list.module';
import { LoggerModule } from 'nestjs-pino';

const imports = [
  LoggerModule.forRoot({
    pinoHttp: {
      transport: { target: 'pino-pretty' },
    },
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
  }),
  ConfigModule.forRoot(),
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get('MONGO_URI'),
    }),
  }),
  CacheConfig,
  ThrottlerConfig,
  MovieModule,
  SeasonModule,
  ReviewModule,
  PersonModule,
  StudioModule,
  KeywordModule,
  ImageModule,
  AuthModule,
  UserModule,
  ListModule,
  TerminusModule,
  HttpModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      baseURL: 'https://api.kinopoisk.dev',
      headers: {
        'X-API-KEY': configService.get<string>('DEFAULT_TOKEN'),
      },
    }),
  }),
  RedisConfig,
  MeiliSearchModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      host: configService.get<string>('MEILI_HOST'),
      apiKey: configService.get<string>('MEILI_API_KEY'),
    }),
  }),
];
@Module({
  imports,
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  private readonly logger = new Logger(AppModule.name);
  configure(consumer: MiddlewareConsumer) {
    const routes = [
      {
        path: `/documentation(.*)`,
        method: RequestMethod.GET,
      },
      {
        path: `/health(.*)`,
        method: RequestMethod.GET,
      },
      {
        path: `/`,
        method: RequestMethod.GET,
      },
      {
        path: `/(icon.png|favicon.ico|swagger.css)`,
        method: RequestMethod.GET,
      },
    ];

    consumer
      .apply(AuthMiddleware)
      .exclude(...routes)
      .forRoutes('/(.*)');
  }

  static createSyncSpecificModule(isSync: boolean): DynamicModule {
    const syncImports = isSync ? [SearchSyncModule, ScheduleModule.forRoot()] : [];

    return {
      module: AppModule,
      imports: [...imports, ...syncImports],
    };
  }
}
