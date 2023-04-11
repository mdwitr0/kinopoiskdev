import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { EntityFields } from '../decorators/paginated.decorator';
import { IQuery } from '../interfaces/query.interface';
import { normalizeDate } from '../utils/query/parse-date.util';

const SYSTEM_KEYS = ['sortField', 'sortType', 'selectFields', 'page', 'limit', 'field', 'search'];

@Injectable()
export class QueryPipe implements PipeTransform {
  constructor(private readonly FIELDS: EntityFields) {}

  transform(value: any, metadata: ArgumentMetadata): IQuery {
    const filter: any = {};
    const sort: any = {};
    const select: any = {};
    let page = 1;
    let limit = 10;

    const setValueToField = (field: string, value: string | number | Array<any> | any) => {
      if (filter[field]) {
        filter[field] = [filter[field], value].flat(2);
      } else {
        filter[field] = value;
      }
    };

    const createTextSearchRegExp = (phrase: string) => {
      if (!phrase) {
        return phrase;
      }

      const words = phrase.split(' ').map((word) => `(?=.*${word}.*)`);
      const regExp = `^${words.join('')}.*$`;

      return new RegExp(regExp, 'i');
    };

    const transformFieldValue = (field: string, value: string): any => {
      const isNullValue = value === '!null';
      const isExcludedFields = this.FIELDS.excludedValuesFields.includes(field) && value.includes('!');
      const isNumberField = this.FIELDS.numberSearchKeys.includes(field);
      const isDateField = this.FIELDS.dateSearchKeys.includes(field);
      const isRegexField = this.FIELDS.regexSearchKeys.includes(field);

      if (isNullValue) {
        return { $ne: null };
      }

      if (isExcludedFields) {
        return {
          $ne: value.substring(1),
        };
      }

      if ((isNumberField || isDateField) && value.includes('-')) {
        const [minValue, maxValue] = value.split('-');
        const result = maxValue
          ? {
              $gte: isDateField ? normalizeDate(minValue) : Number(minValue) || 0,
              $lte: isDateField ? normalizeDate(maxValue) : Number(maxValue) || 0,
            }
          : isDateField
          ? normalizeDate(minValue)
          : Number(minValue) || 0;

        return result;
      } else if (isNumberField) {
        return Number(value) || 0;
      } else if (isDateField) {
        return normalizeDate(value);
      }

      if (isRegexField) {
        return { $regex: createTextSearchRegExp(value) };
      }

      return value;
    };

    // Парсим параметры поиска в старом формате
    if (value.field && value.search) {
      if (Array.isArray(value.field) && Array.isArray(value.search)) {
        value.field.forEach((field, index) => setValueToField(field, value.search[index]));
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
      const fields = Array.isArray(value.sortField) ? value.sortField : [value.sortField];
      const types = Array.isArray(value.sortType) ? value.sortType : [value.sortType];

      fields.forEach((field: string, index: number) => {
        sort[field] = types[index] === '1' ? 1 : -1;
      });
    }

    // Форматируем данные, под валидный для mongo запрос
    for (const [key, keyValue] of Object.entries(filter)) {
      if (!SYSTEM_KEYS.includes(key)) {
        const isInOperator = keyValue.hasOwnProperty('$in');

        if (isInOperator) {
          const inValues = keyValue['$in'];
          const neValues = inValues.filter((val) => val.$ne !== undefined).map((val) => val.$ne);
          const values = inValues.filter((val) => val.$ne === undefined);

          if (neValues.length) {
            filter[key] = { $nin: neValues };
            if (values.length) filter[key]['$in'] = values;
          } else {
            filter[key] = { $in: values };
          }
        }
      }
    }

    // Парсим параметры для выбора полей
    let selectFields = Array.isArray(value.selectFields) ? value.selectFields : value?.selectFields?.split(' ');
    if (!selectFields) selectFields = this.FIELDS.allowFieldsFindAll;
    selectFields.forEach((field: string) => {
      select[field] = 1;
    });

    // Парсим параметры для пагинации
    if (value.page) page = parseInt(value.page, 10);
    if (value.limit) limit = parseInt(value.limit, 10);

    return { filter, sort, select, limit, skip: (page - 1) * limit };
  }
}
