import { ApiNullableProperty } from 'src/common/decorators/api-nullable-property.decorator';
import { MovieDtoV1_3 } from '../v1.3/movie.dto';
import { LinkedMovie, Logo, Rating } from '../../schemas/movie.schema';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class LinkedMovieV1_4 extends LinkedMovie {
  @ApiNullableProperty({ type: () => Rating })
  rating: Rating;

  @ApiNullableProperty({ type: () => Number, example: 2030 })
  year: number;
}

export class NetworkItemV1_4 {
  @ApiNullableProperty({ type: () => String, example: 'Netflix' })
  name: string;

  @ApiNullableProperty({ type: () => Logo })
  logo: Logo;
}
export class NetworksV1_4 {
  @ApiNullableProperty({ type: () => NetworkItemV1_4, isArray: true })
  items: NetworkItemV1_4[];
}

export class MovieDtoV1_4 extends OmitType(MovieDtoV1_3, ['productionCompanies']) {
  @ApiNullableProperty({
    example: ['250 лучших сериалов'],
    description: 'Список коллекций, в которых находится тайтл.',
  })
  lists: string[];

  @ApiNullableProperty({ type: () => LinkedMovieV1_4, isArray: true })
  similarMovies: LinkedMovieV1_4[];

  @ApiNullableProperty({ type: () => LinkedMovieV1_4, isArray: true })
  sequelsAndPrequels: LinkedMovieV1_4[];

  @ApiNullableProperty()
  networks: NetworksV1_4;

  @ApiNullableProperty()
  updatedAt: Date;

  @ApiNullableProperty()
  createdAt: Date;
}
