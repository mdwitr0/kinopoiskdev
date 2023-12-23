import { IsOptional, Validate } from 'class-validator';
import { IsNumberParam } from '../../../common/validation/is-number-param';
import { IsValueInRange } from '../../../common/validation/is-value-in-range';
import { ToArray } from '../../../common/decorators/transform/to-array.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class MovieFindOneParamsDtoV1_4 {
  @ApiProperty({ required: true, description: 'ID из кинопоиска' })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [250, 7000000])
  @Validate(IsNumberParam)
  id?: number;
}
