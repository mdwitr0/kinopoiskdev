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
import { Expose } from 'class-transformer';
import { IsValueInRange } from '../../../common/validation/is-value-in-range';
import { ToArray } from '../../../common/decorators/transform/to-array.decorator';
import { IsEnumParam } from '../../../common/validation/is-enum-param';
import { AreArrayLengthsEqual } from '../../../common/validation/are-array-lengths-equal';
import { IsValues } from '../../../common/validation/is-values';
import { ApiNullableProperty } from '../../../common/decorators/api-nullable-property.decorator';
import { EnumParam } from '../../../common/decorators/types/enum-param';
import { StringParam } from '../../../common/decorators/types/string-param';
import { NumberParam } from '../../../common/decorators/types/number-param';
import { IsNumberParam } from '../../../common/validation/is-number-param';

export enum ListFieldV1_4 {
  'category' = 'category',
  'slug' = 'slug',
  'moviesCount' = 'moviesCount',
  'cover.url' = 'cover.url',
  'cover.previewUrl' = 'cover.previewUrl',
}

export enum ListSelectFieldV1_4 {
  'category' = 'category',
  'slug' = 'slug',
  'moviesCount' = 'moviesCount',
  'cover' = 'cover',
}

enum ListCatregoryV1_4 {
  'Онлайн-кинотеатр' = 'Онлайн-кинотеатр',
  'Премии' = 'Премии',
  'Сборы' = 'Сборы',
  'Сериалы' = 'Сериалы',
  'Фильмы' = 'Фильмы',
}

export class ListRequestDtoV1_4 implements IRequestModel {
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
    enum: ListSelectFieldV1_4,
  })
  @IsOptional()
  @ToArray()
  @Validate(IsEnumParam, [ListSelectFieldV1_4])
  @Expose()
  selectFields?: string[];

  @ApiPropertyOptional({
    isArray: true,
    description: 'Список полей которые не должны быть null или пусты',
    enum: ListFieldV1_4,
  })
  @IsOptional()
  @ToArray()
  @Validate(IsEnumParam, [ListFieldV1_4])
  @Expose()
  notNullFields?: string[];

  @ApiPropertyOptional({ description: 'Сортировка по полям из модели', isArray: true, enum: ListFieldV1_4 })
  @IsOptional()
  @Validate(IsEnumParam, [ListFieldV1_4])
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

  @ApiNullableProperty({ isArray: true, description: 'Поиск slug (пример: `"!top-250", "top-250"`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsString)
  @StringParam()
  slug?: string[];

  @ApiNullableProperty({ isArray: true, description: 'Поиск по категории (пример: `"Фильмы", "!Фильмы"`)', enum: ListCatregoryV1_4 })
  @IsOptional()
  @ToArray()
  @Validate(IsEnumParam, [ListCatregoryV1_4])
  @EnumParam()
  category?: string[];

  @ApiNullableProperty({ isArray: true, description: 'Поиск по количеству фильмов (пример: `"1-200", "10"`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [1, 1000])
  @Validate(IsNumberParam)
  @NumberParam()
  moviesCount?: string[];

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
