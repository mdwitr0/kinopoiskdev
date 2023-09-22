import { AbstractDocsResponseDto } from '../../common/dto/abstract/abstract-docs.response.dto';
import { List } from '../schemas/list.schema';

export class ListDocsResponseDto extends AbstractDocsResponseDto(List) {
  constructor(partial: Partial<ListDocsResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
