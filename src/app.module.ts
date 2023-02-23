import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
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
    MovieModule,
    SeasonModule,
    ReviewModule,
    PersonModule,
    ImageModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      ...['movie', 'season', 'person', 'review', 'image'].map((name) => ({
        path: `/v1/${name}`,
        method: RequestMethod.GET,
      })),
    );
  }
}
