import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as process from 'process';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Season } from './season/schemas/season.schema';
import { SeasonModule } from './season/season.module';
import { Expose, plainToInstance } from 'class-transformer';
import { Review } from './review/schemas/review.schema';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
