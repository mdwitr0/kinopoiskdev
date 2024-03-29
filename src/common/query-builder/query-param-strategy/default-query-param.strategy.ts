import { IQueryParamStrategy } from './query-param.strategy';

export class DefaultQueryParamStrategy implements IQueryParamStrategy {
  is(value: string | string[]): boolean {
    return !!value;
  }

  extractValue(value: string | string[]): string | string[] {
    return value;
  }

  buildWhere(v: string | string[]) {
    const value = this.extractValue(v);

    if (Array.isArray(value)) return { $in: value };
    return value;
  }
}
