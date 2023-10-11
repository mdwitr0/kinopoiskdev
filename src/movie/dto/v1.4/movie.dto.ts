import { ApiNullableProperty } from 'src/common/decorators/api-nullable-property.decorator';
import { MovieDtoV1_3 } from '../v1.3/movie.dto';
import { LinkedMovie, Rating } from '../../schemas/movie.schema';
import { ApiProperty } from '@nestjs/swagger';

export class LinkedMovieV1_4 extends LinkedMovie {
  @ApiProperty({ type: () => Rating })
  rating: Rating;

  @ApiProperty({ type: () => Number, example: 2021 })
  year: number;
}

export class MovieDtoV1_4 extends MovieDtoV1_3 {
  @ApiNullableProperty({
    example: true,
    description: 'Список коллекций, в которых находится тайтл.',
  })
  lists: string[];

  @ApiProperty({ type: () => LinkedMovieV1_4, isArray: true })
  similarMovies: LinkedMovieV1_4[];

  @ApiProperty({ type: () => LinkedMovieV1_4, isArray: true })
  sequelsAndPrequels: LinkedMovieV1_4[];
}
