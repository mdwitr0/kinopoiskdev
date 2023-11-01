import { IQueryParamStrategy } from './query-param.strategy';

export const IncludeQueryParam = '+';

export class IncludeQueryParamStrategy implements IQueryParamStrategy {
  is(value: string | string[]): boolean {
    if (Array.isArray(value)) return value.every((item) => this.is(item));
    if (typeof value !== 'string') return false;
    return value.startsWith(IncludeQueryParam);
  }

  extractValue(value: string | string[]): string | string[] {
    if (Array.isArray(value)) return value.flatMap((item) => this.extractValue(item)) as string[];
    return value.slice(1);
  }

  buildWhere(key: string, v: string | string[]) {
    const value = this.extractValue(v);

    if (Array.isArray(value)) return { [key]: { $all: value } };
    return { [key]: value };
  }
}
