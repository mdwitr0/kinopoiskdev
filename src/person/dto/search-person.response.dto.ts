import { AbstractDocsResponseDto } from 'src/common/dto/abstract/abstract-docs.response.dto';
import { MeiliPersonEntity } from '../entities/meili-person.entity';

export class SearchPersonResponseDto extends AbstractDocsResponseDto(MeiliPersonEntity) {
  constructor(partial: Partial<SearchPersonResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
