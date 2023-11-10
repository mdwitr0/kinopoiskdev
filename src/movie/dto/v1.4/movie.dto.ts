import { ApiNullableProperty } from 'src/common/decorators/api-nullable-property.decorator';
import { MovieDtoV1_3 } from '../v1.3/movie.dto';
import { LinkedMovie, Logo, Rating } from '../../schemas/movie.schema';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class LinkedMovieV1_4 extends LinkedMovie {
  @ApiProperty({ type: () => Rating })
  rating: Rating;

  @ApiProperty({ type: () => Number, example: 2021 })
  year: number;
}

export class NetworkItemV1_4 {
  @ApiProperty({ type: () => String, example: 'Netflix' })
  name: string;

  @ApiProperty({ type: () => Logo })
  logo: Logo;
}
export class NetworksV1_4 {
  @ApiProperty({ type: () => NetworkItemV1_4, isArray: true })
  items: NetworkItemV1_4[];
}

export class MovieDtoV1_4 extends OmitType(MovieDtoV1_3, ['productionCompanies']) {
  @ApiNullableProperty({
    example: ['250 лучших сериалов'],
    description: 'Список коллекций, в которых находится тайтл.',
  })
  lists: string[];

  @ApiProperty({ type: () => LinkedMovieV1_4, isArray: true })
  similarMovies: LinkedMovieV1_4[];

  @ApiProperty({ type: () => LinkedMovieV1_4, isArray: true })
  sequelsAndPrequels: LinkedMovieV1_4[];

  @ApiProperty({ type: () => NetworksV1_4, isArray: true })
  networks: NetworksV1_4;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  createdAt: Date;
}
