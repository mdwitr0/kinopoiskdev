import { AbstractDocsResponseDto } from '../../../common/dto/abstract/abstract-docs.response.dto';
import { MovieDtoV1_3 } from './movie.dto';

export class MovieDocsResponseDtoV1_3 extends AbstractDocsResponseDto(MovieDtoV1_3) {
  constructor(partial: Partial<MovieDocsResponseDtoV1_3>) {
    super(partial);
    Object.assign(this, partial);
  }
}
