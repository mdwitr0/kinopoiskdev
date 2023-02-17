import { Module } from '@nestjs/common';
import { SeasonService } from './season.service';
import { SeasonController } from './season.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SeasonSchema } from './schemas/season.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'seasons', schema: SeasonSchema }])],
  controllers: [SeasonController],
  providers: [SeasonService],
})
export class SeasonModule {}
