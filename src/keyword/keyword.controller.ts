import { BaseController } from 'src/common/base/base.controller';
import { Controller } from 'src/common/decorators/controller.decorator';
import { KeywordDocsResponseDto } from './dto/keyword-docs-response.dto';
import { Keyword } from './schemas/keyword.schema';
import { KeywordService } from './keyword.service';

@Controller('keyword', 'Ключевые слова')
export class KeywordController extends BaseController(Keyword, KeywordDocsResponseDto, 'Поиск по ключевым словам') {
  constructor(private readonly keywordService: KeywordService) {
    super(keywordService);
  }
}
