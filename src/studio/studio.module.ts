import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Studio, StudioSchema } from './schemas/studio.schema';
import { StudioController } from './studio.controller';
import { StudioService } from './studio.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Studio.name, schema: StudioSchema }])],
  controllers: [StudioController],
  providers: [StudioService],
})
export class StudioModule {}
