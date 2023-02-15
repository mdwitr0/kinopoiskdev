import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { IQuery } from '../interfaces/query.interface';

const SYSTEM_KEYS = [
  'sortField',
  'sortType',
  'selectFields',
  'page',
  'limit',
  'field',
  'search',
];

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
        if (Array.isArray(keyValue)) {
          filter[key] = { $in: keyValue };
        } else {
          filter[key] = keyValue;
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
