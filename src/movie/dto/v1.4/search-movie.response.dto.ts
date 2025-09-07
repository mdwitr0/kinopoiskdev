import { AbstractDocsResponseDto } from '../../../common/dto/abstract/abstract-docs.response.dto';
import { SearchMovieDtoV1_4 } from './search-movie.dto';

export class SearchMovieResponseDtoV1_4 extends AbstractDocsResponseDto(SearchMovieDtoV1_4) {
  constructor(partial: Partial<SearchMovieResponseDtoV1_4>) {
    super(partial);
    Object.assign(this, partial);
  }
}
