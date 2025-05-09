import { FilterBuilder } from '../../../common/query-builder/filter-builder';
import { SelectBuilder } from '../../../common/query-builder/select-builder';
import { SortOrder } from 'mongoose';
import { SortBuilder } from '../../../common/query-builder/sort-builder';
import { PaginationBuilder } from '../../../common/query-builder/pagination-builder';
import { IRequestModel } from '../../../common/interfaces/request-model.interface';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min, Validate } from 'class-validator';
import { ParseNumber } from '../../../common/decorators/transform/parse-number.decorator';
import { SetDefaultValue } from '../../../common/decorators/transform/set-default-value.decorator';
import { IsValueInRange } from '../../../common/validation/is-value-in-range';
import { ToArray } from '../../../common/decorators/transform/to-array.decorator';
import { IsEnumParam } from '../../../common/validation/is-enum-param';
import { AreArrayLengthsEqual } from '../../../common/validation/are-array-lengths-equal';
import { IsValues } from '../../../common/validation/is-values';
import { ApiNullableProperty } from '../../../common/decorators/api-nullable-property.decorator';
import { IsNumberParam } from '../../../common/validation/is-number-param';
import { NumberParam } from '../../../common/decorators/types/number-param';
import { IsDateParam } from '../../../common/validation/is-date-param';
import { DateParam } from '../../../common/decorators/types/date-param';
import { EnumParam } from '../../../common/decorators/types/enum-param';
import { StringParam } from '../../../common/decorators/types/string-param';
import { Expose } from 'class-transformer';

export enum ReviewFieldV1_4 {
  'id' = 'id',
  'movieId' = 'movieId',
  'title' = 'title',
  'type' = 'type',
  'review' = 'review',
  'date' = 'date',
  'author' = 'author',
  'authorId' = 'authorId',
  updatedAt = 'updatedAt',
  createdAt = 'createdAt',
}

export enum ReviewSelectFieldV1_4 {
  'id' = 'id',
  'movieId' = 'movieId',
  'title' = 'title',
  'type' = 'type',
  'review' = 'review',
  'date' = 'date',
  'author' = 'author',
  'authorId' = 'authorId',
  updatedAt = 'updatedAt',
  createdAt = 'createdAt',
}

enum ReviewTypeV1_4 {
  'Негативный' = 'Негативный',
  'Нейтральный' = 'Нейтральный',
  'Позитивный' = 'Позитивный',
}

export class ReviewRequestDtoV1_4 implements IRequestModel {
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
    enum: ReviewSelectFieldV1_4,
  })
  @IsOptional()
  @ToArray()
  @Validate(IsEnumParam, [ReviewSelectFieldV1_4])
  @Expose()
  selectFields?: string[];

  @ApiPropertyOptional({
    isArray: true,
    description: 'Список полей которые не должны быть null или пусты',
    enum: ReviewFieldV1_4,
  })
  @IsOptional()
  @ToArray()
  @Validate(IsEnumParam, [ReviewFieldV1_4])
  @Expose()
  notNullFields?: string[];

  @ApiPropertyOptional({ description: 'Сортировка по полям из модели', isArray: true, enum: ReviewFieldV1_4 })
  @IsOptional()
  @Validate(IsEnumParam, [ReviewFieldV1_4])
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

  @ApiNullableProperty({ isArray: true, description: 'Поиск по ID отзыва (пример: `"111", "222", "!666"`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [4000, 5000000])
  @Validate(IsNumberParam)
  @NumberParam()
  id?: string[];

  @ApiNullableProperty({ isArray: true, description: 'Поиск по ID фильма (пример: `"666", "555", "!666"`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [1, 10000000])
  @Validate(IsNumberParam)
  @NumberParam()
  'movieId'?: string[];

  @ApiNullableProperty({ isArray: true, description: 'Поиск отзывов по ID автора (пример: `"666", "555", "!666"`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [1, 200000000])
  @Validate(IsNumberParam)
  @NumberParam()
  'authorId'?: string[];

  @ApiNullableProperty({ isArray: true, description: 'Поиск по имени автора отзыва (пример: `"КиноПоиск", "!КиноПоиск"`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsString)
  @StringParam()
  author?: string[];

  @ApiNullableProperty({
    isArray: true,
    description: 'Поиск по типу отзыва (пример: `"!Негативный", "Нейтральный", "Позитивный"`)',
    enum: ReviewTypeV1_4,
  })
  @IsOptional()
  @ToArray()
  @Validate(IsEnumParam, [ReviewTypeV1_4])
  @EnumParam()
  type?: string[];

  @ApiNullableProperty({ isArray: true, description: 'Поиск по дате создания отзыва (пример: `"01.01.2030-01.01.2022", "01.01.2030"`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsDateParam)
  @DateParam()
  date?: string[];

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

    return Object.keys(sort)?.length ? { ...sort, _id: -1 } : { id: -1, _id: -1 };
  }

  public model2Pagination() {
    const pagination = new PaginationBuilder();

    return pagination.build(this.page, this.limit);
  }
}
