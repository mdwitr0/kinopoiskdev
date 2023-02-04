import { PartialType } from '@nestjs/swagger';
import { AbstractDocsResponseDto } from '../../common/dto/abstract/abstract-docs.response.dto';
import { Season } from '../schemas/season.schema';

export class SeasonDocsResponseDto extends AbstractDocsResponseDto(
  PartialType(Season),
) {
  constructor(partial: Partial<SeasonDocsResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
