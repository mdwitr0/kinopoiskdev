import { ExcludeQueryParamStrategy } from './exclude-query-param.strategy';
import { IncludeQueryParamStrategy } from './include-query-param.strategy';
import { RangeQueryParamStrategy } from './range-query-param.strategy';
import { DefaultQueryParamStrategy } from './default-query-param.strategy';

export interface IQueryParamStrategy {
  is(value: string | string[]): boolean;
  extractValue(value: string | string[]): string | string[];
  buildWhere(value: string | string[]): string | { [key: string]: any };
}

export class QueryParamStrategyFactory {
  static create(value: string | string[]): IQueryParamStrategy {
    const excludeQueryParamStrategy = new ExcludeQueryParamStrategy();
    const includeQueryParamStrategy = new IncludeQueryParamStrategy();
    const rangeQueryParamStrategy = new RangeQueryParamStrategy();
    const defaultQueryParamStrategy = new DefaultQueryParamStrategy();

    if (excludeQueryParamStrategy.is(value)) return excludeQueryParamStrategy;
    if (includeQueryParamStrategy.is(value)) return includeQueryParamStrategy;
    if (rangeQueryParamStrategy.is(value)) return rangeQueryParamStrategy;
    return defaultQueryParamStrategy;
  }

  static createWithStrategies(value: string | string[], strategies: IQueryParamStrategy[]): IQueryParamStrategy {
    const defaultQueryParamStrategy = new DefaultQueryParamStrategy();
    const strategy = strategies.find((strategy) => strategy.is(value));
    return strategy || defaultQueryParamStrategy;
  }
}
