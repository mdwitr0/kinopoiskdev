import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { IQueryParamStrategy, QueryParamStrategyFactory } from '../query-builder/query-param-strategy/query-param.strategy';
import { ExcludeQueryParam } from '../query-builder/query-param-strategy/exclude-query-param.strategy';
import { IncludeQueryParam } from '../query-builder/query-param-strategy/include-query-param.strategy';
import { RangeQueryParam } from '../query-builder/query-param-strategy/range-query-param.strategy';

@ValidatorConstraint({ name: 'isStartWith', async: false })
export class IsStartWith implements ValidatorConstraintInterface {
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

        return this.isValidString(v, args);
      }
    }
    return this.isValidString(value, args);
  }
  defaultMessage(args: ValidationArguments) {
    return `Значение поля ${args.property} должно начинаться с ${args.constraints[0]}!`;
  }

  private isValidString(value: string, args: ValidationArguments): boolean {
    if (value === undefined || value === null || value === '') return false;

    return value.startsWith(args.constraints[0]);
  }
}
