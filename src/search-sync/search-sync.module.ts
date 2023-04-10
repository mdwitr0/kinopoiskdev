import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MovieModule } from 'src/movie/movie.module';
import { PersonModule } from 'src/person/person.module';
import { SearchSyncService } from './search-sync.service';
import { MeiliModule } from '../meili/meili.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchSync, SearchSyncSchema } from './schemas/search-sync.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SearchSync.name, schema: SearchSyncSchema }]),
    ScheduleModule.forRoot(),
    MovieModule,
    PersonModule,
    MeiliModule,
  ],
  providers: [SearchSyncService],
})
export class SearchSyncModule {}
