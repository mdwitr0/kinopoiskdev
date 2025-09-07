import { MeiliMovieEntityV1_4 } from '../../entities/v1.4/meili-movie.entity';

export class SearchMovieDtoV1_4 extends MeiliMovieEntityV1_4 {
  constructor(partial: Partial<SearchMovieDtoV1_4>) {
    super(partial);
    Object.assign(this, partial);
  }
}
