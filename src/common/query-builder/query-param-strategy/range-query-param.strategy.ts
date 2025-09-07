import { IQueryParamStrategy } from './query-param.strategy';

export const RangeQueryParam = '-';

export class RangeQueryParamStrategy implements IQueryParamStrategy {
  is(value: string | string[]): boolean {
    if (Array.isArray(value)) return value.every((item) => this.is(item));
    if (typeof value !== 'string') return false;
    return value.includes(RangeQueryParam);
  }

  extractValue(value: string | string[]): string | string[] {
    if (Array.isArray(value)) return value.flatMap((item) => this.extractValue(item));
    return value.split(RangeQueryParam);
  }

  buildWhere(v: string | string[]) {
    const value = this.extractValue(v);

    if (Array.isArray(value)) {
      const range = {};
      const [min, max] = value;
      if (min !== undefined && min !== '') range['$gte'] = min;
      if (max !== undefined && max !== '') range['$lte'] = max;

      return range;
    }
    return value;
  }
}
