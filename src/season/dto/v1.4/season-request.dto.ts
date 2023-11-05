import { FilterBuilder } from '../../../common/query-builder/filter-builder';
import { SelectBuilder } from '../../../common/query-builder/select-builder';
import { SortOrder } from 'mongoose';
import { SortBuilder } from '../../../common/query-builder/sort-builder';
import { PaginationBuilder } from '../../../common/query-builder/pagination-builder';
import { IRequestModel } from '../../../common/interfaces/request-model.interface';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, Min, Validate } from 'class-validator';
import { ParseNumber } from '../../../common/decorators/transform/parse-number.decorator';
import { SetDefaultValue } from '../../../common/decorators/transform/set-default-value.decorator';
import { Expose } from 'class-transformer';
import { IsValueInRange } from '../../../common/validation/is-value-in-range';
import { ToArray } from '../../../common/decorators/transform/to-array.decorator';
import { IsEnumParam } from '../../../common/validation/is-enum-param';
import { AreArrayLengthsEqual } from '../../../common/validation/are-array-lengths-equal';
import { IsValues } from '../../../common/validation/is-values';
import { ApiNullableProperty } from '../../../common/decorators/api-nullable-property.decorator';
import { IsNumberParam } from '../../../common/validation/is-number-param';
import { NumberParam } from '../../../common/decorators/types/number-param';
import { DateParam } from '../../../common/decorators/types/date-param';

export enum SeasonFieldV1_4 {
  'movieId' = 'movieId',
  'poster.url' = 'poster.url',
  'poster.previewUrl' = 'poster.previewUrl',
  'number' = 'number',
  'name' = 'name',
  'enName' = 'enName',
  'episodesCount' = 'episodesCount',
  'airDate' = 'airDate',
  'episodes.number' = 'episodes.number',
  'episodes.name' = 'episodes.name',
  'episodes.enName' = 'episodes.enName',
  'episodes.airDate' = 'episodes.airDate',
  'episodes.date' = 'episodes.date',
  'episodes.description' = 'episodes.description',
  'episodes.enDescription' = 'episodes.enDescription',
}

export enum SeasonSelectFieldV1_4 {
  'movieId' = 'movieId',
  'poster' = 'poster',
  'number' = 'number',
  'name' = 'name',
  'enName' = 'enName',
  'episodesCount' = 'episodesCount',
  'airDate' = 'airDate',
  'episodes' = 'episodes',
}

export class SeasonRequestDtoV1_4 implements IRequestModel {
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
    enum: SeasonSelectFieldV1_4,
  })
  @IsOptional()
  @ToArray()
  @Validate(IsEnumParam, [SeasonSelectFieldV1_4])
  @Expose()
  selectFields?: string[];

  @ApiPropertyOptional({
    isArray: true,
    description: 'Список полей которые не должны быть null или пусты',
    enum: SeasonFieldV1_4,
  })
  @IsOptional()
  @ToArray()
  @Validate(IsEnumParam, [SeasonFieldV1_4])
  @Expose()
  notNullFields?: string[];

  @ApiPropertyOptional({ description: 'Сортировка по полям из модели', isArray: true, enum: SeasonFieldV1_4 })
  @IsOptional()
  @Validate(IsEnumParam, [SeasonFieldV1_4])
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

  @ApiNullableProperty({ isArray: true, description: 'Поиск по ID фильма (пример: `"666", "555", "!666"`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [1, 7000000])
  @Validate(IsNumberParam)
  @NumberParam()
  'moviesId'?: string[];

  @ApiNullableProperty({ isArray: true, description: 'Поиск по номеру сезона (пример: `"1", "1-19", "!3"`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [1, 10000])
  @Validate(IsNumberParam)
  @NumberParam()
  number?: string[];

  @ApiNullableProperty({ isArray: true, description: 'Поиск по нормеру эпизода (пример: `"1", "1-19", "!3"`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [1, 100000])
  @Validate(IsNumberParam)
  @NumberParam()
  'episodes.number'?: string[];

  @ApiNullableProperty({ isArray: true, description: 'Поиск по дате выхода сезона (пример: `"2020-01-01-2020-12-31", "2020-01-01"`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsDate)
  @DateParam()
  airDate?: string[];

  @ApiNullableProperty({ isArray: true, description: 'Поиск по дате выхода эпизода (пример: `"2020-01-01-2020-12-31", "2020-01-01"`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsDate)
  @DateParam()
  'episodes.airDate'?: string[];

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

    return Object.keys(sort)?.length ? { ...sort, _id: -1 } : { _id: -1 };
  }

  public model2Pagination() {
    const pagination = new PaginationBuilder();

    return pagination.build(this.page, this.limit);
  }
}
