import { ApiNullableProperty } from 'src/common/decorators/api-nullable-property.decorator';
import { MovieDtoV1_3 } from '../v1.3/movie.dto';

export class MovieDtoV1_4 extends MovieDtoV1_3 {
  @ApiNullableProperty({
    example: true,
    description: 'Список коллекций, в которых находится тайтл.',
  })
  lists: string[];
}
