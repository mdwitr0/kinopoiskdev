import { IQueryParamStrategy } from './query-param.strategy';

export const RangeQueryParam = '-';

export class RangeQueryParamStrategy implements IQueryParamStrategy {
  is(value: string | string[]): boolean {
    if (Array.isArray(value)) return value.every((item) => this.is(item));
    return value.includes(RangeQueryParam);
  }

  extractValue(value: string | string[]): string | string[] {
    if (Array.isArray(value)) return value.flatMap((item) => this.extractValue(item));
    return value.split(RangeQueryParam);
  }
}
