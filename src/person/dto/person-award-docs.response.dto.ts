import { AbstractDocsResponseDto } from '../../common/dto/abstract/abstract-docs.response.dto';
import { PersonAward } from '../schemas/person-award.schema';

export class PersonAwardDocsResponseDto extends AbstractDocsResponseDto(PersonAward) {
  constructor(partial: Partial<PersonAwardDocsResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
