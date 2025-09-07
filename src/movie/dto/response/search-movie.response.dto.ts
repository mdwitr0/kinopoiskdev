import { MeiliMovieEntity } from 'src/movie/entities/meili-movie.entity';
import { AbstractDocsResponseDto } from '../../../common/dto/abstract/abstract-docs.response.dto';

export class SearchMovieResponseDto extends AbstractDocsResponseDto(MeiliMovieEntity) {
  constructor(partial: Partial<SearchMovieResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
