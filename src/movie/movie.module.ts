import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieSchema } from './schemas/movie.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'movies', schema: MovieSchema }])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
