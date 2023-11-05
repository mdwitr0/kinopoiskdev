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
import { EnumParam } from '../../../common/decorators/types/enum-param';
import { StringParam } from '../../../common/decorators/types/string-param';

export enum ImageFieldV1_4 {
  'movieId' = 'movieId',
  'type' = 'type',
  'language' = 'language',
  'url' = 'url',
  'previewUrl' = 'previewUrl',
  'height' = 'height',
  'width' = 'width',
}

export enum ImageSelectFieldV1_4 {
  'movieId' = 'movieId',
  'type' = 'type',
  'language' = 'language',
  'url' = 'url',
  'previewUrl' = 'previewUrl',
  'height' = 'height',
  'width' = 'width',
}

enum ImageTypeV1_4 {
  'backdrops' = 'backdrops',
  'cover' = 'cover',
  'frame' = 'frame',
  'promo' = 'promo',
  'screenshot' = 'screenshot',
  'shooting' = 'shooting',
  'still' = 'still',
  'wallpaper' = 'wallpaper',
}

enum ImageLanguageV1_4 {
  'ab' = 'ab',
  'af' = 'af',
  'am' = 'am',
  'ar' = 'ar',
  'as' = 'as',
  'av' = 'av',
  'ba' = 'ba',
  'be' = 'be',
  'bg' = 'bg',
  'bn' = 'bn',
  'ca' = 'ca',
  'ce' = 'ce',
  'cn' = 'cn',
  'cs' = 'cs',
  'cu' = 'cu',
  'cv' = 'cv',
  'da' = 'da',
  'de' = 'de',
}

export class ImageRequestDtoV1_4 implements IRequestModel {
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
    enum: ImageSelectFieldV1_4,
  })
  @IsOptional()
  @ToArray()
  @Validate(IsEnumParam, [ImageSelectFieldV1_4])
  @Expose()
  selectFields?: string[];

  @ApiPropertyOptional({
    isArray: true,
    description: 'Список полей которые не должны быть null или пусты',
    enum: ImageFieldV1_4,
  })
  @IsOptional()
  @ToArray()
  @Validate(IsEnumParam, [ImageFieldV1_4])
  @Expose()
  notNullFields?: string[];

  @ApiPropertyOptional({ description: 'Сортировка по полям из модели', isArray: true, enum: ImageFieldV1_4 })
  @IsOptional()
  @Validate(IsEnumParam, [ImageFieldV1_4])
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

  @ApiPropertyOptional({ description: 'Поиск картинок по id фильма (пример: `"666", "!666"`)', isArray: true })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [1, 7000000])
  @NumberParam()
  movieId?: string[];

  @ApiPropertyOptional({ description: 'Поиск картинок по типу (пример: `"cover", "!cover"`)', isArray: true, enum: ImageTypeV1_4 })
  @IsOptional()
  @ToArray()
  @Validate(IsEnumParam, [ImageTypeV1_4])
  @EnumParam()
  type?: string[];

  @ApiPropertyOptional({ description: 'Поиск картинок по языку (пример: `"en", "!de"`)', isArray: true, enum: ImageLanguageV1_4 })
  @IsOptional()
  @ToArray()
  @StringParam()
  language?: string[];

  @ApiPropertyOptional({ description: 'Поиск картинок по высоте (пример: `"1920", "360-1920"`)', isArray: true })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [1, 10000])
  @NumberParam()
  height?: string[];

  @ApiPropertyOptional({ description: 'Поиск картинок по ширине (пример: `"1080", "320-1080"`)', isArray: true })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [1, 10000])
  @NumberParam()
  width?: string[];

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
