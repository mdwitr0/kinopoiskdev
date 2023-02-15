import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { Value } from 'src/movie/schemas/movie.schema';
import { IQuery } from '../interfaces/query.interface';
import { normalizeDate } from '../utils/query/parse-date.util';

const SYSTEM_KEYS = [
  'sortField',
  'sortType',
  'selectFields',
  'page',
  'limit',
  'field',
  'search',
];

const FIELDS = {
  idKeys: ['id', 'externalId.imdb'],
  regexSearchKeys: [
    'name',
    'alternativeName',
    'enName',
    'names.name',
    'tagline',
    'slogan',
    'description',
    'persons.name',
    'persons.enName',
    'persons.description',
  ],
  dateSearchKeys: [
    'premiere.world',
    'premiere.russia',
    'premiere.digital',
    'premiere.bluray',
    'premiere.dvd',
  ],
  numberSearchKeys: [
    'id',
    'externalId.imdb',
    'externalId.tmdb',
    'typeNumber',
    'movieLength',
    'year',
    'rating.kp',
    'rating.imdb',
    'rating.tmdb',
    'votes.kp',
    'votes.imdb',
    'votes.tmdb',
    'ratingAgeLimits',
    'persons.id',
    'budget.value',
    'fees.world',
    'fees.usa',
    'fees.russia',
    'image.postersCount',
    'image.backdropsCount',
    'image.framesCount',
    'reviewInfo.count',
    'reviewInfo.positiveCount',
    'seasonsInfo.number',
    'seasonsInfo.episodesCount',
    'videos.trailers.size',
    'videos.teasers.size',
  ],
};

@Injectable()
export class QueryPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): IQuery {
    const filter: any = {};
    const sort: any = {};
    const select: any = {};
    let page = 1;
    let limit = 10;

    const setValueToField = (
      field: string,
      value: string | number | Array<any> | any,
    ) => {
      if (filter[field]) {
        filter[field] = [filter[field], value].flat(2);
      } else {
        filter[field] = value;
      }
    };

    const transformFieldValue = (field: string, value: string): any => {
      const isNullValue = value === '!null';
      const isNumberField = FIELDS.numberSearchKeys.includes(field);
      const isDateField = FIELDS.dateSearchKeys.includes(field);
      const isRegexField = FIELDS.regexSearchKeys.includes(field);

      if (isNullValue) {
        return { $ne: null };
      }

      if ((isNumberField || isDateField) && value.includes('-')) {
        const [minValue, maxValue] = value.split('-');
        const result = maxValue
          ? {
              $gte: isDateField ? normalizeDate(minValue) : minValue,
              $lte: isDateField ? normalizeDate(maxValue) : maxValue,
            }
          : isDateField
          ? normalizeDate(minValue)
          : minValue;

        return result;
      }

      if (isRegexField) {
        return { $regex: new RegExp(`.*${value}.*`, 'i') };
      }

      return value;
    };

    // Парсим параметры поиска в старом формате
    if (value.field && value.search) {
      if (Array.isArray(value.field) && Array.isArray(value.search)) {
        value.field.forEach((field, index) =>
          setValueToField(field, value.search[index]),
        );
      } else {
        setValueToField(value.field, value.search);
      }
    }

    // Парсим параметры для поиска в новом формате
    for (const [field, fieldValue] of Object.entries(value)) {
      if (!SYSTEM_KEYS.includes(field)) setValueToField(field, fieldValue);
    }

    // Форматируем данные, под валидный для mongo запрос
    for (const [key, keyValue] of Object.entries(filter)) {
      if (!SYSTEM_KEYS.includes(key)) {
        const isArray = Array.isArray(keyValue);

        if (isArray) {
          filter[key] = {
            $in: keyValue.map((val) => transformFieldValue(key, val)),
          };
        } else {
          filter[key] = transformFieldValue(key, keyValue as string);
        }
      }
    }

    // Парсим параметры для сортировки
    if (value.sortField) {
      const fields = Array.isArray(value.sortField)
        ? value.sortField
        : [value.sortField];
      const types = Array.isArray(value.sortType)
        ? value.sortType
        : [value.sortType];

      fields.forEach((field: string, index: number) => {
        sort[field] = types[index] === '1' ? 1 : -1;
      });
    }

    // Парсим параметры для выбора полей
    if (value.selectFields) {
      const fields = Array.isArray(value.selectFields)
        ? value.selectFields.join(' ')
        : value.selectFields;
      fields.split(' ').forEach((field: string) => {
        select[field] = 1;
      });
    }

    // Парсим параметры для пагинации
    if (value.page) page = parseInt(value.page, 10);
    if (value.limit) limit = parseInt(value.limit, 10);

    return { filter, sort, select, limit, skip: (page - 1) * limit };
  }
}
