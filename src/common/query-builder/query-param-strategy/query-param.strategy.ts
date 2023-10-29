import { ExcludeQueryParam, ExcludeQueryParamStrategy } from './exclude-query-param.strategy';
import { IncludeQueryParam, IncludeQueryParamStrategy } from './include-query-param.strategy';
import { RangeQueryParam, RangeQueryParamStrategy } from './range-query-param.strategy';

export interface IQueryParamStrategy {
  is(value: string | string[]): boolean;
  extractValue(value: string | string[]): string | string[];
}

export class QueryParamStrategyFactory {
  static create(value: string): IQueryParamStrategy {
    switch (value) {
      case ExcludeQueryParam:
        return new ExcludeQueryParamStrategy();
      case IncludeQueryParam:
        return new IncludeQueryParamStrategy();
      case RangeQueryParam:
        return new RangeQueryParamStrategy();
      default:
        throw new Error('Invalid query param strategy');
    }
  }
}
