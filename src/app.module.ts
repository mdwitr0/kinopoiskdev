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
import { LoggerModule } from 'nestjs-pino';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StudioModule } from './studio/studio.module';
import { KeywordModule } from './keyword/keyword.module';
import { MeiliSearchModule } from 'nestjs-meilisearch';
import { SearchSyncModule } from './search-sync/search-sync.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from './user/user.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

const imports = [
  LoggerModule.forRoot(
    process.env.NODE_ENV === 'production'
      ? {}
      : {
          pinoHttp: {
            transport: { target: 'pino-pretty' },
          },
        },
  ),
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
  ThrottlerModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      ttl: config.get('THROTTLE_TTL') || 1,
      limit: config.get('THROTTLE_LIMIT') || 50,
      storage: new ThrottlerStorageRedisService(config.get('REDIS_URL')),
    }),
  }),
  MovieModule,
  SeasonModule,
  ReviewModule,
  PersonModule,
  StudioModule,
  KeywordModule,
  ImageModule,
  AuthModule,
  UserModule,
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
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  private readonly logger = new Logger(AppModule.name);
  configure(consumer: MiddlewareConsumer) {
    const apiVersions = ['v1', 'v1.1', 'v1.2', 'v1.3'];
    const entities = ['movie', 'season', 'person', 'review', 'image', 'keyword', 'studio'];

    const routes = entities.flatMap((name) =>
      apiVersions.map((version) => ({
        path: `/${version}/${name}`,
        method: RequestMethod.GET,
      })),
    );

    consumer.apply(AuthMiddleware).forRoutes(...routes);
  }

  static createMasterSpecificModule(isMaster: boolean): DynamicModule {
    const masterImports = isMaster ? [SearchSyncModule] : [];

    return {
      module: AppModule,
      imports: [...imports, ...masterImports],
    };
  }
}
