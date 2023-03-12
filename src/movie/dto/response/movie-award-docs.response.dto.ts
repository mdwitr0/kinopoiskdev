import { PartialType } from '@nestjs/swagger';
import { AbstractDocsResponseDto } from '../../../common/dto/abstract/abstract-docs.response.dto';
import { MovieAward } from '../../schemas/movie-award.schema';

export class MovieAwardDocsResponseDto extends AbstractDocsResponseDto(PartialType(MovieAward)) {
  constructor(partial: Partial<MovieAwardDocsResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
