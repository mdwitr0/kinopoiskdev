import { AbstractDocsResponseDto } from '../../../common/dto/abstract/abstract-docs.response.dto';
import { List } from '../../schemas/list.schema';

export class ListDocsResponseDtoV1_4 extends AbstractDocsResponseDto(List) {
  constructor(partial: Partial<ListDocsResponseDtoV1_4>) {
    super(partial);
    Object.assign(this, partial);
  }
}
