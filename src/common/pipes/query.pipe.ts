import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { Types } from 'mongoose';
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
    const query: any = {};
    const sort: any = {};
    const select: any = {};
    let page = 1;
    let limit = 10;

    // Парсим параметры для поиска
    if (value.search) {
      if (Array.isArray(value.field) && Array.isArray(value.search)) {
        value.field.forEach((field: string, index: number) => {
          query[field] = value.search[index];
        });
      } else if (
        typeof value.field === 'string' &&
        typeof value.search === 'string'
      ) {
        query[value.field] = value.search;
      } else {
        throw new BadRequestException('Invalid search parameters');
      }
    }

    // Парсим параметры для поиска
    for (const [key, val] of Object.entries(value)) {
      if (SYSTEM_KEYS.includes(key)) {
        query[key] = val;
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
    if (value.page) {
      page = parseInt(value.page, 10);
    }
    if (value.limit) {
      limit = parseInt(value.limit, 10);
    }

    return { query, sort, select, limit, skip: (page - 1) * limit };
  }
}
