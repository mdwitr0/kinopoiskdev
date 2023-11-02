import { QueryParamStrategyFactory } from './query-param-strategy/query-param.strategy';

type Filter = { [key: string]: any };

export class FilterBuilder {
  private filter: Filter = { $or: [] };

  public setByNumber(key: string, values: string[]) {
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

      if (where['$in'] || where['$all']) {
        Object.assign(simpleWhere, { [key]: where });
        continue;
      }

      if (where['$nin'] || where['$ne'] || where['$gte'] || where['$lte']) {
        Object.assign(specialWhere, { [key]: { ...specialWhere[key], ...(where as any) } });
      }
    }

    const wheres = [simpleWhere, specialWhere].filter((item) => Object.keys(item).length > 0);
    this.filter['$or'] = [...this.filter['$or'], ...wheres];

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

  public setByString(key: string, value: string) {
    this.filter[key] = value;
    return this;
  }

  public setByBoolean(key: string, value: boolean) {
    this.filter[key] = value;
    return this;
  }

  public setByDate(key: string, value: Date) {
    this.filter[key] = value;
    return this;
  }

  public build() {
    return this.filter;
  }
}
