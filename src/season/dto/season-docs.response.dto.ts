import { Season } from '../schemas/season.schema';
import { AbstractDocsResponseDto } from '../../common/dto/abstract/abstract-docs.response.dto';

export class SeasonDocsResponseDto extends AbstractDocsResponseDto(Season) {
  constructor(partial: Partial<SeasonDocsResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
