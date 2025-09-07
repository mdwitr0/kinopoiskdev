import { FindManyKeywordDto } from '../find-many-keyword.dto';

export class FindManyKeywordDtoV1_4 extends FindManyKeywordDto {
  constructor(partial: Partial<FindManyKeywordDtoV1_4>) {
    super(partial);
    Object.assign(this, partial);
  }
}
