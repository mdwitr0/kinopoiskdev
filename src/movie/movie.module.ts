import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { Movie, MovieSchema } from './schemas/movie.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieAward, MovieAwardSchema } from './schemas/movie-award.schema';
import { MeiliModule } from '../meili/meili.module';
import { CacheConfig } from 'src/common/configs/cache.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CacheConfig,
    MongooseModule.forFeature([
      { name: Movie.name, schema: MovieSchema },
      { name: MovieAward.name, schema: MovieAwardSchema },
    ]),
    MeiliModule,
    ConfigModule,
  ],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService],
})
export class MovieModule {}
