import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ListSchema } from './schemas/list.schema';
import { CacheConfig } from 'src/common/configs/cache.config';

@Module({
  imports: [CacheConfig, MongooseModule.forFeature([{ name: 'list', schema: ListSchema }])],
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule {}
