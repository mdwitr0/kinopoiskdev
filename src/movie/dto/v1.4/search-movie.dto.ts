import { MeiliMovieEntity } from 'src/movie/entities/meili-movie.entity';
import { ApiProperty } from '@nestjs/swagger';

export class SearchMovieDtoV1_4 extends MeiliMovieEntity {
  @ApiProperty()
  isSeries: boolean;

  constructor(partial: Partial<SearchMovieDtoV1_4>) {
    super(partial);
    Object.assign(this, partial);
  }
}
