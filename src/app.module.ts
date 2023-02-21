import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SeasonModule } from './season/season.module';
import { ReviewModule } from './review/review.module';
import { PersonModule } from './person/person.module';
import { ImageModule } from './image/image.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { MovieController } from './movie/movie.controller';
import { SeasonController } from './season/season.controller';
import { ReviewController } from './review/review.controller';
import { PersonController } from './person/person.controller';
import { ImageController } from './image/image.controller';
import { LoggerModule } from 'nestjs-pino';
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
    consumer
      .apply(AuthMiddleware)
      .forRoutes(MovieController, SeasonController, ReviewController, PersonController, ImageController);
  }
}
