import { IQueryParamStrategy } from './query-param.strategy';

export const ExcludeQueryParam = '!';

export class ExcludeQueryParamStrategy implements IQueryParamStrategy {
  is(value: string | string[]): boolean {
    if (Array.isArray(value)) return value.every((item) => this.is(item));
    return value.startsWith(ExcludeQueryParam);
  }

  extractValue(value: string | string[]): string | string[] {
    if (Array.isArray(value)) return value.flatMap((item) => this.extractValue(item)) as string[];
    return value.slice(1);
  }
}
