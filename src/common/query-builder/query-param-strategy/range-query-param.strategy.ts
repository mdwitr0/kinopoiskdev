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

  buildWhere(key: string, v: string | string[]) {
    const value = this.extractValue(v);

    if (Array.isArray(value)) return { [key]: { $gte: value[0], $lte: value[1] } };
    return { [key]: value };
  }
}
