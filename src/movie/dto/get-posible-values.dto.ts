import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export enum DistinctFields {
  GENRES = 'genres.name',
  COUNTRIES = 'countries.name',
  TYPES = 'type',
  TYPE_NUMBERS = 'typeNumber',
  STATUS = 'status',
}

export class GetPosibleValueDto {
  @ApiProperty({ enum: DistinctFields })
  @IsEnum(DistinctFields)
  field: DistinctFields;

  constructor(partial: Partial<GetPosibleValueDto>) {
    Object.assign(this, partial);
  }
}
