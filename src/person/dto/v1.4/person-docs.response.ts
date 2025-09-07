import { PersonDocsResponseDto } from '../person-docs.response';

export class PersonDocsResponseDtoV1_4 extends PersonDocsResponseDto {
  constructor(partial: Partial<PersonDocsResponseDtoV1_4>) {
    super(partial);
    Object.assign(this, partial);
  }
}
