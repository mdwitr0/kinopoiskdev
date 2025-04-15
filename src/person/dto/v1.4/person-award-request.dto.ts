import { IsNumber, IsOptional, Min, Validate } from 'class-validator';
import { ApiNullableProperty } from '../../../common/decorators/api-nullable-property.decorator';
import { IsNumberParam } from '../../../common/validation/is-number-param';
import { IsValueInRange } from '../../../common/validation/is-value-in-range';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ParseNumber } from '../../../common/decorators/transform/parse-number.decorator';
import { SetDefaultValue } from '../../../common/decorators/transform/set-default-value.decorator';
import { AreArrayLengthsEqual } from '../../../common/validation/are-array-lengths-equal';
import { IsValues } from '../../../common/validation/is-values';
import { ToArray } from '../../../common/decorators/transform/to-array.decorator';
import { IsEnumParam } from '../../../common/validation/is-enum-param';
import { NumberParam } from '../../../common/decorators/types/number-param';
import { FilterBuilder } from '../../../common/query-builder/filter-builder';
import { SelectBuilder } from '../../../common/query-builder/select-builder';
import { SortBuilder } from '../../../common/query-builder/sort-builder';
import { PaginationBuilder } from '../../../common/query-builder/pagination-builder';
import { SortOrder } from 'mongoose';
import { IRequestModel } from '../../../common/interfaces/request-model.interface';
import { StringParam } from '../../../common/decorators/types/string-param';
import { IsBooleanParam } from '../../../common/validation/is-boolean-param';
import { BooleanParam } from '../../../common/decorators/types/boolean-param';
import { DateParam } from 'src/common/decorators/types/date-param';
import { IsDateParam } from '../../../common/validation/is-date-param';
import { Expose } from 'class-transformer';

enum PersonFieldV1_4 {
  'personId' = 'personId',
  'winning' = 'winning',
  'nomination.award.title' = 'nomination.award.title',
  'nomination.award.year' = 'nomination.award.year',
  'nomination.title' = 'nomination.title',
  'movies.id' = 'movies.id',
  updatedAt = 'updatedAt',
  createdAt = 'createdAt',
}
enum PersonSelectFieldV1_4 {
  'personId' = 'personId',
  'winning' = 'winning',
  'nomination' = 'nomination',
  'movies' = 'movies',
  updatedAt = 'updatedAt',
  createdAt = 'createdAt',
}

export class PersonAwardRequestDtoV1_4 implements IRequestModel {
  @ApiPropertyOptional({ description: 'Номер страницы', minimum: 1, default: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @ParseNumber()
  @SetDefaultValue(1)
  @Expose()
  page: number;

  @ApiPropertyOptional({ description: 'Количество элементов на странице', minimum: 1, maximum: 250, default: 10 })
  @IsOptional()
  @Validate(IsValueInRange, [1, 250])
  @ParseNumber()
  @SetDefaultValue(10)
  @Expose()
  limit: number;

  @ApiPropertyOptional({
    description: 'Список полей требуемых в ответе из модели',
    isArray: true,
    enum: PersonSelectFieldV1_4,
  })
  @IsOptional()
  @ToArray()
  @Validate(IsEnumParam, [PersonSelectFieldV1_4])
  @Expose()
  selectFields?: string[];

  @ApiPropertyOptional({
    isArray: true,
    description: 'Список полей которые не должны быть null или пусты',
    enum: PersonFieldV1_4,
  })
  @IsOptional()
  @ToArray()
  @Validate(IsEnumParam, [PersonFieldV1_4])
  @Expose()
  notNullFields?: string[];

  @ApiPropertyOptional({ description: 'Сортировка по полям из модели', isArray: true, enum: PersonFieldV1_4 })
  @IsOptional()
  @Validate(IsEnumParam, [PersonFieldV1_4])
  @Validate(AreArrayLengthsEqual, ['sortType'])
  @ToArray()
  @Expose()
  sortField?: string[];

  @ApiPropertyOptional({ description: 'Тип сортировки применительно к полям из sortField (пример: `"1", "-1"`)' })
  @IsOptional()
  @Validate(IsValues, ['1', '-1'])
  @Validate(AreArrayLengthsEqual, ['sortField'])
  @ToArray()
  @Expose()
  sortType?: string[];

  @ApiNullableProperty({ isArray: true, description: 'Поиск по ID персоны (пример: `"666", "555", "!666"`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [1, 30000000])
  @Validate(IsNumberParam)
  @NumberParam()
  personId?: string[];

  @ApiNullableProperty({ isArray: true, description: 'Поиск по номинациям (пример: `"Оскар", "Золотой глобус"`)' })
  @IsOptional()
  @ToArray()
  @StringParam()
  'nomination.title'?: string[];

  @ApiNullableProperty({ isArray: true, description: 'Поиск по наградам (пример: `"Лучший фильм", "Лучший актер"`)' })
  @IsOptional()
  @ToArray()
  @StringParam()
  'nomination.award.title'?: string[];

  @ApiNullableProperty({ isArray: true, description: 'Поиск по году награды (пример: `"2019", "2020"`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [1900, 2030])
  @Validate(IsNumberParam)
  @NumberParam()
  'nomination.award.year'?: string[];

  @ApiNullableProperty({ description: 'Поиск по победам (пример: `"true", "false"`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsBooleanParam)
  @BooleanParam()
  @Expose()
  winning?: string;

  @ApiNullableProperty({
    type: 'string',
    isArray: true,
    description: 'Поиск по дате обновления в базе (пример: `01.01.2020, 01.01.2020-31.12.2020`)',
  })
  @IsOptional()
  @ToArray()
  @Validate(IsDateParam)
  @DateParam()
  updatedAt: string;

  @ApiNullableProperty({
    type: 'string',
    isArray: true,
    description: 'Поиск по дате добавления в базу (пример: `01.01.2020, 01.01.2020-31.12.2020`)',
  })
  @IsOptional()
  @ToArray()
  @Validate(IsDateParam)
  @DateParam()
  createdAt: string;

  public model2Where() {
    const filter = new FilterBuilder();
    for (const key of Object.keys(this)) {
      const type = Reflect.getMetadata('type', this, key);

      switch (type) {
        case 'string':
          filter.setString(key, this[key]);
          break;
        case 'number':
          filter.setNumber(key, this[key]);
          break;
        case 'boolean':
          filter.setBoolean(key, this[key]);
          break;
        case 'date':
          filter.setDate(key, this[key]);
          break;
        case 'enum':
          filter.setEnum(key, this[key]);
          break;
        default:
          break;
      }
    }

    if (this.notNullFields?.length) {
      filter.setNotNull(this.notNullFields);
    }

    return filter.build();
  }

  public model2Select() {
    const select = new SelectBuilder();

    return select.build(this.selectFields);
  }

  public model2Sort(): { [key: string]: SortOrder } {
    const sort = new SortBuilder().build(this.sortField, this.sortType);

    return Object.keys(sort)?.length ? { ...sort, _id: -1 } : { 'votes.kp': -1, _id: -1 };
  }

  public model2Pagination() {
    const pagination = new PaginationBuilder();

    return pagination.build(this.page, this.limit);
  }
}
