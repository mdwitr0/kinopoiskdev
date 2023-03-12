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
  ],
})
export class AppModule implements NestModule {
  private readonly logger = new Logger(AppModule.name);
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      ...['movie', 'season', 'person', 'review', 'image', 'keyword'].map((name) => ({
        path: `/v1/${name}`,
        method: RequestMethod.GET,
      })),
      ...['movie', 'season', 'person', 'review', 'image', 'keyword'].map((name) => ({
        path: `/v1.1/${name}`,
        method: RequestMethod.GET,
      })),
    );
  }
}
