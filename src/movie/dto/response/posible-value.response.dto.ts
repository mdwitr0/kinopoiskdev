import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { transliterate } from 'transliteration';

export class PosibleValueDto {
  @ApiProperty({ description: 'Значение по которому нужно делать запрос в базу данных' })
  @Expose()
  name: string;

  @ApiProperty({ description: 'Вспомогательное значение' })
  @Expose()
  slug: string;

  constructor(value: string) {
    this.name = value;
    this.slug = transliterate(value, { replace: [[' ', '-']] });
  }
}
