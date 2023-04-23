import { ApiNullableProperty } from 'src/common/decorators/api-nullable-property.decorator';
import { MovieDtoV1 } from '../v1/movie.dto';

export class MovieDtoV1_3 extends MovieDtoV1 {
  @ApiNullableProperty({
    example: true,
    description: 'Признак того, что тайтл находится в прокате',
  })
  ticketsOnSale: boolean;

  @ApiNullableProperty({ example: 155, description: 'Продолжительность всех серий' })
  totalSeriesLength: number;

  @ApiNullableProperty({ example: 20, description: 'Средняя продолжительность серии' })
  seriesLength: number;
}
