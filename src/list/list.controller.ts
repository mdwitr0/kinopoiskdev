import { ListService } from './list.service';
import { ListDocsResponseDto } from './dto/list-docs.response.dto';
import { BaseController } from 'src/common/base/base.controller';
import { Controller } from 'src/common/decorators/controller.decorator';
import { List } from './schemas/list.schema';

@Controller('list', 'Коллекции кино')
export class ListController extends BaseController(List, ListDocsResponseDto, 'Поиск коллекций', '1.4') {
  constructor(private readonly listService: ListService) {
    super(listService);
  }
}
