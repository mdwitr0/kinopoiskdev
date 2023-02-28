import { BaseControllerWithFindById } from 'src/common/base/base.controller';
import { Controller } from 'src/common/decorators/controller.decorator';
import { PersonDocsResponseDto } from './dto/person-docs.response.dto';
import { PersonService } from './person.service';
import { Person } from './schemas/person.schema';

@Controller('person', 'Актеры, режиссеры, операторы, и т.д')
export class PersonController extends BaseControllerWithFindById(Person, PersonDocsResponseDto, 'Поиск персон') {
  constructor(private readonly personService: PersonService) {
    super(personService);
  }
}
