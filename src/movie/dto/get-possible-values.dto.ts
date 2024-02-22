import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ApiNullableProperty } from '../../common/decorators/api-nullable-property.decorator';

export enum DistinctFields {
  GENRES = 'genres.name',
  COUNTRIES = 'countries.name',
  TYPES = 'type',
  TYPE_NUMBERS = 'typeNumber',
  STATUS = 'status',
}

export class GetPossibleValueDto {
  @ApiNullableProperty({ enum: DistinctFields })
  @IsEnum(DistinctFields)
  field: DistinctFields;

  constructor(partial: Partial<GetPossibleValueDto>) {
    Object.assign(this, partial);
  }
}
