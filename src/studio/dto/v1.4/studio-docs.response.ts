import { StudioDocsResponseDto } from '../studio-docs-response.dto';

export class StudioDocsResponseDtoV1_4 extends StudioDocsResponseDto {
  constructor(partial: Partial<StudioDocsResponseDtoV1_4>) {
    super(partial);
    Object.assign(this, partial);
  }
}
