import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { IQueryParamStrategy, QueryParamStrategyFactory } from '../query-builder/query-param-strategy/query-param.strategy';
import { ExcludeQueryParam } from '../query-builder/query-param-strategy/exclude-query-param.strategy';
import { RangeQueryParam } from '../query-builder/query-param-strategy/range-query-param.strategy';
import { IncludeQueryParam } from '../query-builder/query-param-strategy/include-query-param.strategy';

@ValidatorConstraint({ name: 'isNumber', async: false })
export class IsNumber implements ValidatorConstraintInterface {
  private queryParamStrategies: IQueryParamStrategy[] = [];
  constructor() {
    this.queryParamStrategies = [ExcludeQueryParam, IncludeQueryParam, RangeQueryParam].map((strategy) => QueryParamStrategyFactory.create(strategy));
  }
  validate(value: any, args: ValidationArguments) {
    if (Array.isArray(value)) return value.every((item) => this.validate(item, args));

    for (const queryParamStrategy of this.queryParamStrategies) {
      if (queryParamStrategy.is(value)) {
        const v = queryParamStrategy.extractValue(value);

        if (Array.isArray(v)) return this.validate(v, args);

        return this.isValidNumber(v);
      }
    }

    return this.isValidNumber(value);
  }
  defaultMessage(args: ValidationArguments) {
    return `Поле ${args.property} должно быть числом или массивом чисел!`;
  }

  private isValidNumber(value: any): boolean {
    return !isNaN(Number(value));
  }
}
