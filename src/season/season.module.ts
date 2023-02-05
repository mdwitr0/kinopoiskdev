import { Module } from '@nestjs/common';
import { SeasonService } from './season.service';
import { SeasonController } from './season.controller';

@Module({
  controllers: [SeasonController],
  providers: [SeasonService],
})
export class SeasonModule {}
