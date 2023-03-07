import { AbstractDocsResponseDto } from '../../common/dto/abstract/abstract-docs.response.dto';
import { Studio } from '../schemas/studio.schema';

export class StudioDocsResponseDto extends AbstractDocsResponseDto(Studio) {
  constructor(partial: Partial<StudioDocsResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
