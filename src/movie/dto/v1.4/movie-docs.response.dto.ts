import { AbstractDocsResponseDto } from '../../../common/dto/abstract/abstract-docs.response.dto';
import { MovieDtoV1_4 } from './movie.dto';

export class MovieDocsResponseDtoV1_4 extends AbstractDocsResponseDto(MovieDtoV1_4) {
  constructor(partial: Partial<MovieDocsResponseDtoV1_4>) {
    super(partial);
    Object.assign(this, partial);
  }
}
