import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { PersonModule } from './person/person.module';
import { ImageModule } from './image/image.module';
import { ReviewModule } from './review/review.module';
import { SeasonModule } from './season/season.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MovieModule,
    PersonModule,
    ImageModule,
    ReviewModule,
    SeasonModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
