import { AbstractDocsResponseDto } from '../../../common/dto/abstract/abstract-docs.response.dto';
import { SeasonV1 } from './season.dto';

export class SeasonDocsResponseDtoV1 extends AbstractDocsResponseDto(SeasonV1) {
  constructor(partial: Partial<SeasonDocsResponseDtoV1>) {
    super(partial);
    Object.assign(this, partial);
  }
}
