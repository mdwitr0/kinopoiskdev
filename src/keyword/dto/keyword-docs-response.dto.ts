import { AbstractDocsResponseDto } from '../../common/dto/abstract/abstract-docs.response.dto';
import { Keyword } from '../schemas/keyword.schema';

export class KeywordDocsResponseDto extends AbstractDocsResponseDto(Keyword) {
  constructor(partial: Partial<KeywordDocsResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
