import { AbstractDocsResponseDto } from '../../../common/dto/abstract/abstract-docs.response.dto';
import { SeasonV1_4 } from './season.dto';

export class SeasonDocsResponseDtoV1_4 extends AbstractDocsResponseDto(SeasonV1_4) {
  constructor(partial: Partial<SeasonDocsResponseDtoV1_4>) {
    super(partial);
    Object.assign(this, partial);
  }
}
