import { CacheModule, Logger, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
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

@Module({
  imports: [
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
    CacheModule.register({
      isGlobal: true,
      ttl: 1000 * 60 * 60,
    }),
    MovieModule,
    SeasonModule,
    ReviewModule,
    PersonModule,
    StudioModule,
    KeywordModule,
    ImageModule,
    AuthModule,
    MeiliSearchModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        host: configService.get<string>('MEILI_HOST'),
        apiKey: configService.get<string>('MEILI_API_KEY'),
      }),
    }),
  ],
})
export class AppModule implements NestModule {
  private readonly logger = new Logger(AppModule.name);
  configure(consumer: MiddlewareConsumer) {
    const apiVersions = ['v1', 'v1.1', 'v1.2'];
    const entities = ['movie', 'season', 'person', 'review', 'image', 'keyword'];

    const routes = entities.flatMap((name) =>
      apiVersions.map((version) => ({
        path: `/${version}/${name}`,
        method: RequestMethod.GET,
      })),
    );

    consumer.apply(AuthMiddleware).forRoutes(...routes);
  }
}
