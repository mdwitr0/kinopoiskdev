import { FindManyImageDto } from '../find-many-image.dto';

export class FindManyImageDtoV1_4 extends FindManyImageDto {
  constructor(partial: Partial<FindManyImageDtoV1_4>) {
    super(partial);
    Object.assign(this, partial);
  }
}
