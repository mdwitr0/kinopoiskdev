import { QueryParamStrategyFactory } from './query-param-strategy/query-param.strategy';
import { normalizeDate } from '../utils/query/parse-date.util';

type Filter = { [key: string]: any };

export class FilterBuilder {
  private specialKeys = ['$nin', '$ne', '$gte', '$lte', '$all'];
  private simpleKeys = ['$in'];
  private filters: Filter[] = [];

  private filter: Filter = { $or: [] };

  public setNumber(key: string, values: string[]) {
    this.toWhere<number>(key, values, (item) => Number(item));
  }

  public setString(key: string, values: string[]) {
    this.toWhere<string>(key, values, (item) => String(item));
  }

  public setDate(key: string, values: string[]) {
    this.toWhere<Date>(key, values, (item) => normalizeDate(item));
  }

  public setBoolean(key: string, values: string[]) {
    const simpleWhere = {};

    for (const value of values) {
      simpleWhere[key] = value === 'true';
    }

    const wheres = [simpleWhere].filter((item) => Object.keys(item).length > 0);
    this.filter['$or'] = [...this.filter['$or'], ...wheres];

    this.filters.push({ $or: wheres });
    return this;
  }

  public build() {
    return this.filters.length > 1 ? { $and: this.filters } : this.filters[0] || {};
  }

  private toWhere<T>(key: string, values: string[], transform: (item: string) => T) {
    const specialWhere = {};
    const simpleWhere = {};

    const groupValues = this.groupValuesByStrategies(values);
    for (const value of groupValues) {
      const where = QueryParamStrategyFactory.create(value).buildWhere(value);

      Object.keys(where).forEach((key) => {
        if (!where[key]) delete where[key];

        if (Array.isArray(where[key])) {
          where[key] = where[key].map((item) => transform(item));
        } else {
          where[key] = transform(where[key]);
        }
      });

      if (!where) continue;

      if (this.simpleKeys.some((key) => where[key])) {
        Object.assign(simpleWhere, { [key]: where });
        continue;
      }

      if (this.specialKeys.some((key) => where[key])) {
        Object.assign(specialWhere, { [key]: { ...specialWhere[key], ...(where as any) } });
      }
    }

    const wheres = [simpleWhere, specialWhere].filter((item) => Object.keys(item).length > 0);
    this.filter['$or'] = [...this.filter['$or'], ...wheres];

    this.filters.push({ $or: wheres });
    return this;
  }

  private groupValuesByStrategies(values: string[]): string[][] {
    const map = new Map<string, string[]>();

    for (const value of values) {
      const strategy = QueryParamStrategyFactory.create(value);
      const key = strategy.constructor.name;
      const values = map.get(key) || [];
      values.push(value);
      map.set(key, values);
    }

    return Array.from(map.values());
  }
}
