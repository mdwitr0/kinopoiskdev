import { AbstractDocsResponseDto } from '../../common/dto/abstract/abstract-docs.response.dto';
import { Person } from '../schemas/person.schema';

export class PersonDocsResponseDto extends AbstractDocsResponseDto(Person) {
  constructor(partial: Partial<PersonDocsResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
