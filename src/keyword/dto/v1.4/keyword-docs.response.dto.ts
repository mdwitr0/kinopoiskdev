import { KeywordDocsResponseDto } from '../keyword-docs-response.dto';

export class KeywordDocsResponseDtoV1_4 extends KeywordDocsResponseDto {
  constructor(partial: Partial<KeywordDocsResponseDtoV1_4>) {
    super(partial);
    Object.assign(this, partial);
  }
}
