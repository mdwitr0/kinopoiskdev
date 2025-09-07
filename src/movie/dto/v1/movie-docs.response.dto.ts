import { AbstractDocsResponseDto } from '../../../common/dto/abstract/abstract-docs.response.dto';
import { MovieDtoV1 } from './movie.dto';

export class MovieDocsResponseDtoV1 extends AbstractDocsResponseDto(MovieDtoV1) {
  constructor(partial: Partial<MovieDocsResponseDtoV1>) {
    super(partial);
    Object.assign(this, partial);
  }
}
