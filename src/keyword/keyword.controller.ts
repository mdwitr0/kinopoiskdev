import { BaseController } from 'src/common/base/base.controller';
import { Controller } from 'src/common/decorators/controller.decorator';
import { KeywordDocsResponseDto } from './dto/keyword-docs-response.dto';
import { Keyword } from './schemas/keyword.schema';
import { KeywordService } from './keyword.service';
import { CacheInterceptor, Get, Query, UseInterceptors, Version } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { KeywordRequestDtoV1_4 } from './dto/v1.4/keyword-request.dto';
import { KeywordDocsResponseDtoV1_4 } from './dto/v1.4/keyword-docs.response.dto';

@Controller('keyword', 'Ключевые слова')
export class KeywordController extends BaseController(Keyword, KeywordDocsResponseDto, 'Поиск по ключевым словам') {
  constructor(private readonly keywordService: KeywordService) {
    super(keywordService);
  }

  @Version('1.4')
  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({
    summary: 'Поиск ключевых слов',
    description: `Этот метод предназначен для поиска ключевых слов`,
  })
  async findManyV1_4(@Query() request: KeywordRequestDtoV1_4): Promise<KeywordDocsResponseDtoV1_4> {
    return this.keywordService.findManyV1_4(request);
  }
}
