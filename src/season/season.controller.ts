import { BaseController } from 'src/common/base/base.controller';
import { Controller } from 'src/common/decorators/controller.decorator';
import { Season } from './schemas/season.schema';
import { SeasonDocsResponseDto } from './dto/season-docs.response.dto';
import { SeasonService } from './season.service';

@Controller('season', 'Сезоны и эпизоды')
export class SeasonController extends BaseController(
  Season,
  SeasonDocsResponseDto,
  'Поиск сезонов',
) {
  constructor(private readonly seasonService: SeasonService) {
    super(seasonService);
  }
}
