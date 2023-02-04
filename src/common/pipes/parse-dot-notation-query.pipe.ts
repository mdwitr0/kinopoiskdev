/* eslint-disable @typescript-eslint/ban-types*/
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { RemoveArrayBrackets } from '../utils/query/remove-array-brackets';
import { ToArray } from '../utils/query/to-array';

type Filters = {
  field?: string[];
  search?: string[];
  sortField?: string[];
  sortType?: string[];
  [key: string]: any;
};

@Injectable()
export class ParseDotNotationQuery<I = Filters>
  implements PipeTransform<I, any>
{
  async transform(
    value: I,
    { metatype, type }: ArgumentMetadata,
  ): Promise<any> {
    if (type !== 'query') return value;
    if (!metatype || !this.toValidate(metatype)) return value;

    const payload = this.transformDotNotationQuery(value);
    return plainToInstance(metatype, payload);
  }

  private transformDotNotationQuery(query: Filters): any {
    if (typeof query !== 'object' || !query) return query;
    query = RemoveArrayBrackets(query);
    const { field, search, sortField, sort, ...paginationObj } = query;

    const queryObj = this.parseDotNotationObj(ToArray(field), ToArray(search));
    const sortObj = this.parseDotNotationObj(ToArray(sortField), ToArray(sort));
    return { query: queryObj, sortQuery: sortObj, pagination: paginationObj };
  }

  // Парсинг dot notation строки "parentKey.key" в объект { parentKey: { key: value } } с присвоением значение value из search
  private parseDotNotationObj(fields: string[], values: string[]): any {
    if (!fields || !values) return {};
    const payload = {};
    fields.forEach((field, index) => {
      const value = values[index];
      field.split('.').reduce((acc, key, i, arr) => {
        if (i === arr.length - 1) acc[key] = value;
        else acc[key] = {};
        return acc[key];
      }, payload);
    });
    return payload;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
