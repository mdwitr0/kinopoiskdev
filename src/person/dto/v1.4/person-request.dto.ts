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
import { ApiNullableProperty } from '../../../common/decorators/api-nullable-property.decorator';
import { IsNumberParam } from '../../../common/validation/is-number-param';
import { NumberParam } from '../../../common/decorators/types/number-param';
import { EnumParam } from '../../../common/decorators/types/enum-param';
import { IsDateParam } from '../../../common/validation/is-date-param';
import { DateParam } from '../../../common/decorators/types/date-param';
import { StringParam } from '../../../common/decorators/types/string-param';
import { IsBooleanParam } from '../../../common/validation/is-boolean-param';
import { BooleanParam } from '../../../common/decorators/types/boolean-param';

export enum PersonFieldV1_4 {
  'id' = 'id',
  'name' = 'name',
  'enName' = 'enName',
  'photo' = 'photo',
  'sex' = 'sex',
  'growth' = 'growth',
  'birthday' = 'birthday',
  'death' = 'death',
  'age' = 'age',
  'birthPlace.value' = 'birthPlace.value',
  'deathPlace.value' = 'deathPlace.value',
  'spouses.id' = 'spouses.id',
  'spouses.name' = 'spouses.name',
  'spouses.divorced' = 'spouses.divorced',
  'spouses.divorcedReason' = 'spouses.divorcedReason',
  'spouses.sex' = 'spouses.sex',
  'spouses.children' = 'spouses.children',
  'spouses.relation' = 'spouses.relation',
  'countAwards' = 'countAwards',
  'profession.value' = 'profession.value',
  'facts.value' = 'facts.value',
  'movies.id' = 'movies.id',
  'movies.name' = 'movies.name',
  'movies.alternativeName' = 'movies.alternativeName',
  'movies.rating' = 'movies.rating',
  'movies.general' = 'movies.general',
  'movies.description' = 'movies.description',
  'movies.enProfession' = 'movies.enProfession',
  updatedAt = 'updatedAt',
  createdAt = 'createdAt',
}

export enum PersonSelectFieldV1_4 {
  'id' = 'id',
  'name' = 'name',
  'enName' = 'enName',
  'photo' = 'photo',
  'sex' = 'sex',
  'growth' = 'growth',
  'birthday' = 'birthday',
  'death' = 'death',
  'age' = 'age',
  'birthPlace' = 'birthPlace',
  'deathPlace' = 'deathPlace',
  'spouses' = 'spouses',
  'countAwards' = 'countAwards',
  'profession' = 'profession',
  'facts' = 'facts',
  'movies' = 'movies',
  updatedAt = 'updatedAt',
  createdAt = 'createdAt',
}

const defaultSelectFields = ['id', 'name', 'enName', 'photo', 'age', 'sex'];

enum PersonSexV1_4 {
  'Женский' = 'Женский',
  'Мужской' = 'Мужской',
}

enum PersonProfessionV1_4 {
  'Актер' = 'Актер',
  'Актер дубляжа' = 'Актер дубляжа',
  'Актриса' = 'Актриса',
  'Актриса дубляжа' = 'Актриса дубляжа',
  'В титрах не указаны' = 'В титрах не указаны',
  'Группа: Хроника' = 'Группа: Хроника',
  'Группа: играют самих себя' = 'Группа: играют самих себя',
  'Директор фильма' = 'Директор фильма',
  'Звукорежиссер' = 'Звукорежиссер',
  'Композитор' = 'Композитор',
  'Монтажер' = 'Монтажер',
  'Озвучка' = 'Озвучка',
  'Оператор' = 'Оператор',
  'Переводчик' = 'Переводчик',
  'Продюсер' = 'Продюсер',
  'Режиссер' = 'Режиссер',
  'Режиссер дубляжа' = 'Режиссер дубляжа',
  'Сценарист' = 'Сценарист',
  'Художник' = 'Художник',
}

enum PersonEnProfessionV1_4 {
  'actor' = 'actor',
  'cameo' = 'cameo',
  'composer' = 'composer',
  'design' = 'design',
  'director' = 'director',
  'director_ussr' = 'director_ussr',
  'editor' = 'editor',
  'group_cameo' = 'group_cameo',
  'group_uncredited' = 'group_uncredited',
  'operator' = 'operator',
  'producer' = 'producer',
  'sound_designer' = 'sound_designer',
  'translator' = 'translator',
  'uncredited' = 'uncredited',
  'voice_director' = 'voice_director',
  'voiceover' = 'voiceover',
  'writer' = 'writer',
}

export class PersonRequestDtoV1_4 implements IRequestModel {
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
    default: defaultSelectFields,
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

  @ApiNullableProperty({ isArray: true, description: 'Поиск по ID KinoPoisk (пример: `"111", "222", "!666"`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [1, 30000000])
  @Validate(IsNumberParam)
  @NumberParam()
  @Expose()
  id?: string[];

  @ApiNullableProperty({ isArray: true, description: 'Поиск по ID фильма (пример: `"666", "555", "!666"`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [1, 7000000])
  @Validate(IsNumberParam)
  @NumberParam()
  @Expose()
  'movies.id'?: string[];

  @ApiNullableProperty({ isArray: true, description: 'Поиск по гендеру (пример: `Женский, Мужской`)', enum: PersonSexV1_4 })
  @IsOptional()
  @ToArray()
  @Validate(IsEnumParam, [PersonSexV1_4])
  @EnumParam()
  @Expose()
  sex?: string[];

  @ApiNullableProperty({ isArray: true, description: 'Поиск по росту (пример: `170-180, 180`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [1, 300])
  @NumberParam()
  @Expose()
  growth?: string[];

  @ApiNullableProperty({ isArray: true, description: 'Поиск по дате рождения (пример: `01.01.2000-01.01.2001, 01.01.2000`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsDateParam)
  @DateParam()
  @Expose()
  birthday?: string[];

  @ApiNullableProperty({ isArray: true, description: 'Поиск по дате смерти (пример: `01.01.2000-01.01.2001, 01.01.2000`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsDateParam)
  @DateParam()
  @Expose()
  death?: string[];

  @ApiNullableProperty({ isArray: true, description: 'Поиск по возрасту (пример: `18-25, 25`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [0, 300])
  @NumberParam()
  @Expose()
  age?: string[];

  @ApiNullableProperty({ isArray: true, description: 'Поиск по месту рождения (пример: `Москва, Санкт-Петербург`)' })
  @IsOptional()
  @ToArray()
  @StringParam()
  @Expose()
  'birthPlace.value'?: string[];

  @ApiNullableProperty({ isArray: true, description: 'Поиск по месту смерти (пример: `Москва, Санкт-Петербург`)' })
  @IsOptional()
  @ToArray()
  @StringParam()
  @Expose()
  'deathPlace.value'?: string[];

  @ApiNullableProperty({ isArray: true, description: 'Поиск по ID супруги(супруга) (пример: `111, 222`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [1, 30000000])
  @Validate(IsNumberParam)
  @NumberParam()
  @Expose()
  'spouses.id'?: string[];

  @ApiNullableProperty({ isArray: true, description: 'Поиск по статусу развода (пример: `true, false`)' })
  @IsOptional()
  @Validate(IsBooleanParam)
  @BooleanParam()
  @Expose()
  'spouses.divorced'?: string;

  @ApiNullableProperty({ isArray: true, description: 'Поиск по гендеру супруги(супруга) (пример: `Женский, Мужской`)', enum: PersonSexV1_4 })
  @IsOptional()
  @ToArray()
  @Validate(IsEnumParam, [PersonSexV1_4])
  @EnumParam()
  @Expose()
  'spouses.sex'?: string[];

  @ApiNullableProperty({ isArray: true, description: 'Поиск по количеству наград (пример: `1-10, 10`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [0, 100000])
  @Validate(IsNumberParam)
  @NumberParam()
  @Expose()
  countAwards?: string[];

  @ApiNullableProperty({ isArray: true, description: 'Поиск по профессии (пример: `Актер, Режиссер`)', enum: PersonProfessionV1_4 })
  @IsOptional()
  @ToArray()
  @Validate(IsEnumParam, [PersonProfessionV1_4])
  @EnumParam()
  @Expose()
  'profession.value'?: string[];

  @ApiNullableProperty({ isArray: true, description: 'Поиск по рейтингу фильма (пример: `1-10, 10`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [0, 10])
  @Validate(IsNumberParam)
  @NumberParam()
  @Expose()
  'movies.rating'?: string[];

  @ApiNullableProperty({
    isArray: true,
    description: 'Поиск по профессии в фильмах на английском (пример: `actor, director`)',
    enum: PersonEnProfessionV1_4,
  })
  @IsOptional()
  @ToArray()
  @Validate(IsEnumParam, [PersonEnProfessionV1_4])
  @EnumParam()
  @Expose()
  'movies.enProfession'?: string[];

  @ApiNullableProperty({
    type: 'string',
    isArray: true,
    description: 'Поиск по дате обновления в базе (пример: `01.01.2020, 01.01.2020-31.12.2020`)',
  })
  @IsOptional()
  @ToArray()
  @Validate(IsDateParam)
  @DateParam()
  @Expose()
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
  @Expose()
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

    return select.build(this.selectFields, defaultSelectFields);
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
