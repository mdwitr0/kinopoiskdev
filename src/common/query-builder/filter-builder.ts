import { IQueryParamStrategy, QueryParamStrategyFactory } from './query-param-strategy/query-param.strategy';
import { normalizeDate } from '../utils/query/parse-date.util';
import { ExcludeQueryParamStrategy } from './query-param-strategy/exclude-query-param.strategy';
import { IncludeQueryParamStrategy } from './query-param-strategy/include-query-param.strategy';

export type Filter = { [key: string]: any };

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

  public setEnum(key: string, values: string[]) {
    this.toWhere<string>(
      key,
      values.filter((s) => s),
      (item) => String(item),
      [new ExcludeQueryParamStrategy(), new IncludeQueryParamStrategy()],
    );
  }

  public setDate(key: string, values: string[]) {
    this.toWhere<Date>(key, values, (item) => normalizeDate(item));
  }

  public setBoolean(key: string, value: string) {
    const simpleWhere = {};

    simpleWhere[key] = value === 'true';

    const wheres = [simpleWhere].filter((item) => Object.keys(item).length > 0);
    this.filter['$or'] = [...this.filter['$or'], ...wheres];

    this.filters.push({ $or: wheres });
    return this;
  }

  public setNotNull(keys: string[]) {
    for (const key of keys) {
      this.filters.push(this.toNotNull(key));
    }

    return this;
  }

  public build() {
    return this.filters.length > 1 ? { $and: this.filters } : this.filters[0] || {};
  }

  private toWhere<T>(key: string, values: string[], transform: (item: string) => T, strategies?: IQueryParamStrategy[]) {
    if (!values?.length) return this;
    const specialWhere = {};
    const simpleWhere = {};

    const groupValues = this.groupValuesByStrategies(values, strategies);
    for (const value of groupValues) {
      const where = strategies
        ? QueryParamStrategyFactory.createWithStrategies(value, strategies).buildWhere(value)
        : QueryParamStrategyFactory.create(value).buildWhere(value);

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

  private toNotNull(key: string) {
    if (key.includes('.')) {
      const keys = key.split('.');
      const itemField = keys.pop();
      const arrayField = keys.join('.');

      return {
        $or: [{ [key]: { $exists: true, $ne: null } }, { [arrayField]: { $elemMatch: { [itemField]: { $exists: true, $ne: null } } } }],
      };
    }

    return { [key]: { $ne: null } };
  }

  private groupValuesByStrategies(values: string[], strategies?: IQueryParamStrategy[]): string[][] {
    const map = new Map<string, string[]>();

    for (const value of values) {
      const strategy = strategies ? QueryParamStrategyFactory.createWithStrategies(value, strategies) : QueryParamStrategyFactory.create(value);
      const key = strategy.constructor.name;
      const values = map.get(key) || [];
      values.push(value);
      map.set(key, values);
    }

    return Array.from(map.values());
  }
}
