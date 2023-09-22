import { MeiliMovieEntity } from 'src/movie/entities/meili-movie.entity';
import { ApiProperty } from '@nestjs/swagger';

export class SearchMovieDtoV1_4 extends MeiliMovieEntity {
  @ApiProperty()
  isSeries: boolean;

  @ApiProperty()
  ticketsOnSale: boolean;

  @ApiProperty()
  totalSeriesLength: number;

  @ApiProperty()
  seriesLength: number;

  @ApiProperty()
  ratingMpaa: string;

  @ApiProperty()
  ageRating: number;

  @ApiProperty()
  top10?: number | null;

  @ApiProperty()
  top250?: number | null;

  @ApiProperty()
  typeNumber: number;

  @ApiProperty()
  status: string;

  constructor(partial: Partial<SearchMovieDtoV1_4>) {
    super(partial);
    Object.assign(this, partial);
  }
}
