import { QueryParamStrategyFactory } from './query-param-strategy/query-param.strategy';
import { normalizeDate } from '../utils/query/parse-date.util';

type Filter = { [key: string]: any };

export class FilterBuilder {
  private filter: Filter = { $or: [] };

  public setNumber(key: string, values: string[]) {
    const specialWhere = {};
    const simpleWhere = {};

    const groupValues = this.groupValuesByStrategies(values);
    for (const value of groupValues) {
      const where = QueryParamStrategyFactory.create(value).buildWhere(value);

      Object.keys(where).forEach((key) => {
        if (!where[key]) delete where[key];

        if (Array.isArray(where[key])) {
          where[key] = where[key].map((item) => Number(item));
        } else {
          where[key] = Number(where[key]);
        }
      });

      if (!where) continue;

      if (where['$in']) {
        Object.assign(simpleWhere, { [key]: where });
        continue;
      }

      if (where['$nin'] || where['$ne'] || where['$gte'] || where['$lte'] || where['$all']) {
        Object.assign(specialWhere, { [key]: { ...specialWhere[key], ...(where as any) } });
      }
    }

    const wheres = [simpleWhere, specialWhere].filter((item) => Object.keys(item).length > 0);
    this.filter['$or'] = [...this.filter['$or'], ...wheres];

    return this;
  }

  public setString(key: string, values: string[]) {
    const specialWhere = {};
    const simpleWhere = {};

    const groupValues = this.groupValuesByStrategies(values);
    for (const value of groupValues) {
      const where = QueryParamStrategyFactory.create(value).buildWhere(value);

      if (!where) continue;

      if (where['$in']) {
        Object.assign(simpleWhere, { [key]: { ...simpleWhere[key], ...(where as any) } });
        continue;
      }

      if (where['$nin'] || where['$ne'] || where['$all']) {
        Object.assign(specialWhere, { [key]: { ...specialWhere[key], ...(where as any) } });
      }
    }

    const wheres = [simpleWhere, specialWhere].filter((item) => Object.keys(item).length > 0);
    this.filter['$or'] = [...this.filter['$or'], ...wheres];

    return this;
  }

  setBoolean(key: string, values: string[]) {
    const simpleWhere = {};

    for (const value of values) {
      simpleWhere[key] = value === 'true';
    }

    const wheres = [simpleWhere].filter((item) => Object.keys(item).length > 0);
    this.filter['$or'] = [...this.filter['$or'], ...wheres];

    return this;
  }

  setDate(key: string, values: string[]) {
    const specialWhere = {};
    const simpleWhere = {};

    const groupValues = this.groupValuesByStrategies(values);
    for (const value of groupValues) {
      const where = QueryParamStrategyFactory.create(value).buildWhere(value);

      Object.keys(where).forEach((key) => {
        if (!where[key]) delete where[key];

        if (Array.isArray(where[key])) {
          where[key] = where[key].map((item) => normalizeDate(item));
        } else {
          where[key] = normalizeDate(where[key]);
        }
      });

      if (!where) continue;

      if (where['$in']) {
        Object.assign(simpleWhere, { [key]: where });
        continue;
      }

      if (where['$nin'] || where['$ne'] || where['$gte'] || where['$lte'] || where['$all']) {
        Object.assign(specialWhere, { [key]: { ...specialWhere[key], ...(where as any) } });
      }
    }

    const wheres = [simpleWhere, specialWhere].filter((item) => Object.keys(item).length > 0);
    this.filter['$or'] = [...this.filter['$or'], ...wheres];

    return this;
  }

  public build() {
    return this.filter;
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
