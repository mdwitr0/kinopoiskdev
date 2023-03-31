import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MovieModule } from 'src/movie/movie.module';
import { PersonModule } from 'src/person/person.module';
import { SearchSyncService } from './search-sync.service';
import { MeiliModule } from '../meili/meili.module';

@Module({
  imports: [ScheduleModule.forRoot(), MovieModule, PersonModule, MeiliModule],
  providers: [SearchSyncService],
})
export class SearchSyncModule {}
