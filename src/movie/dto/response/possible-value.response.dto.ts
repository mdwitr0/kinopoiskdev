import { Expose } from 'class-transformer';
import { transliterate } from 'transliteration';
import { ApiNullableProperty } from '../../../common/decorators/api-nullable-property.decorator';

export class PossibleValueDto {
  @ApiNullableProperty({ description: 'Значение по которому нужно делать запрос в базу данных' })
  @Expose()
  name: string;

  @ApiNullableProperty({ description: 'Вспомогательное значение' })
  @Expose()
  slug: string;

  constructor(value: string) {
    this.name = value;
    this.slug = transliterate(value, { replace: [[' ', '-']] });
  }
}
