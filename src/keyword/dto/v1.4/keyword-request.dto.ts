import { FilterBuilder } from '../../../common/query-builder/filter-builder';
import { SelectBuilder } from '../../../common/query-builder/select-builder';
import { SortOrder } from 'mongoose';
import { SortBuilder } from '../../../common/query-builder/sort-builder';
import { PaginationBuilder } from '../../../common/query-builder/pagination-builder';
import { IRequestModel } from '../../../common/interfaces/request-model.interface';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min, Validate } from 'class-validator';
import { ParseNumber } from '../../../common/decorators/transform/parse-number.decorator';
import { SetDefaultValue } from '../../../common/decorators/transform/set-default-value.decorator';
import { Expose } from 'class-transformer';
import { IsValueInRange } from '../../../common/validation/is-value-in-range';
import { ToArray } from '../../../common/decorators/transform/to-array.decorator';
import { IsEnumParam } from '../../../common/validation/is-enum-param';
import { AreArrayLengthsEqual } from '../../../common/validation/are-array-lengths-equal';
import { IsValues } from '../../../common/validation/is-values';
import { NumberParam } from '../../../common/decorators/types/number-param';
import { StringParam } from '../../../common/decorators/types/string-param';

export enum KeywordFieldV1_4 {
  'id' = 'id',
  'movie.id' = 'movie.id',
  'title' = 'title',
}

export enum KeywordSelectFieldV1_4 {
  'id' = 'id',
  'movie' = 'movie',
  'title' = 'title',
}

export class KeywordRequestDtoV1_4 implements IRequestModel {
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
    enum: KeywordSelectFieldV1_4,
  })
  @IsOptional()
  @ToArray()
  @Validate(IsEnumParam, [KeywordSelectFieldV1_4])
  @Expose()
  selectFields?: string[];

  @ApiPropertyOptional({
    isArray: true,
    description: 'Список полей которые не должны быть null или пусты',
    enum: KeywordFieldV1_4,
  })
  @IsOptional()
  @ToArray()
  @Validate(IsEnumParam, [KeywordFieldV1_4])
  @Expose()
  notNullFields?: string[];

  @ApiPropertyOptional({ description: 'Сортировка по полям из модели', isArray: true, enum: KeywordFieldV1_4 })
  @IsOptional()
  @Validate(IsEnumParam, [KeywordFieldV1_4])
  @Validate(AreArrayLengthsEqual, ['sortType'])
  @ToArray()
  @Expose()
  sortField?: string[];

  @ApiPropertyOptional({ description: 'Тип сортировки применительно к полям из sortField (пример: `"1", "-1"`)', isArray: true })
  @IsOptional()
  @Validate(IsValues, ['1', '-1'])
  @Validate(AreArrayLengthsEqual, ['sortField'])
  @ToArray()
  @Expose()
  sortType?: string[];

  @ApiPropertyOptional({ description: 'Поиск ключевого слова по id (пример: `"666", "!666"`)', isArray: true })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [1, 100000000000])
  @NumberParam()
  id?: string[];

  @ApiPropertyOptional({ description: 'Поиск ключевых слов по id фильма (пример: `"666", "!666"`)', isArray: true })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [1, 7000000])
  @NumberParam()
  'movie.id'?: string[];

  @ApiPropertyOptional({ description: 'Поиск ключевых слов по наименованию (пример: `"1980-е", "!1980-е"`)', isArray: true })
  @IsOptional()
  @ToArray()
  @StringParam()
  title?: string[];

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
