import { BaseControllerWithFindById } from 'src/common/base/base.controller';
import { Controller } from 'src/common/decorators/controller.decorator';
import { StudioDocsResponseDto } from './dto/studio-docs-response.dto';
import { Studio } from './schemas/studio.schema';
import { StudioService } from './studio.service';

@Controller('studio', 'Студии')
export class StudioController extends BaseControllerWithFindById(Studio, StudioDocsResponseDto, 'Поиск студий') {
  constructor(private readonly studioService: StudioService) {
    super(studioService);
  }
}
