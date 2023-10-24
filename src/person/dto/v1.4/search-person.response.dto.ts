import { AbstractDocsResponseDto } from 'src/common/dto/abstract/abstract-docs.response.dto';
import { MeiliPersonEntityV1_4 } from '../../entities/v1.4/meili-person.entity';

export class SearchPersonResponseDtoV1_4 extends AbstractDocsResponseDto(MeiliPersonEntityV1_4) {
  constructor(partial: Partial<SearchPersonResponseDtoV1_4>) {
    super(partial);
    Object.assign(this, partial);
  }
}
