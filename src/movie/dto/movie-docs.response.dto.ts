import { PartialType } from '@nestjs/swagger';
import { AbstractDocsResponseDto } from '../../common/dto/abstract/abstract-docs.response.dto';
import { Movie } from '../schemas/movie.schema';

export class MovieDocsResponseDto extends AbstractDocsResponseDto(Movie) {
  constructor(partial: Partial<MovieDocsResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
