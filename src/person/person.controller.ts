import { BaseController } from 'src/common/base/base.controller';
import { Controller } from 'src/common/decorators/controller.decorator';
import { PersonDocsResponseDto } from './dto/person-docs.response.dto';
import { PersonService } from './person.service';
import { Person } from './schemas/person.schema';

@Controller('person', 'Актеры, режисеры, операторы, и т.д')
export class PersonController extends BaseController(
  Person,
  PersonDocsResponseDto,
  'Поиск персон',
) {
  constructor(private readonly personService: PersonService) {
    super(personService);
  }
}
