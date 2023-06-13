import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Keyword, KeywordSchema } from './schemas/keyword.schema';
import { KeywordController } from './keyword.controller';
import { KeywordService } from './keyword.service';
import { CacheConfig } from 'src/common/configs/cache.config';

@Module({
  imports: [CacheConfig, MongooseModule.forFeature([{ name: Keyword.name, schema: KeywordSchema }])],
  controllers: [KeywordController],
  providers: [KeywordService],
})
export class KeywordModule {}
