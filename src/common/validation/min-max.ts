import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { IQueryParamStrategy, QueryParamStrategyFactory } from '../query-builder/query-param-strategy/query-param.strategy';
import { ExcludeQueryParam } from '../query-builder/query-param-strategy/exclude-query-param.strategy';
import { IncludeQueryParam } from '../query-builder/query-param-strategy/include-query-param.strategy';
import { RangeQueryParam } from '../query-builder/query-param-strategy/range-query-param.strategy';

@ValidatorConstraint({ name: 'minMax', async: false })
export class MinMax implements ValidatorConstraintInterface {
  private queryParamStrategies: IQueryParamStrategy[] = [];
  constructor() {
    this.queryParamStrategies = [ExcludeQueryParam, IncludeQueryParam, RangeQueryParam].map((strategy) => QueryParamStrategyFactory.create(strategy));
  }
  validate(value: any, args: ValidationArguments) {
    if (value === undefined || value === null || value === '') return false;
    if (Array.isArray(value)) return value.every((item) => this.validate(item, args));
    if (typeof value === 'number') return this.isValidNumber(value, args);
    for (const queryParamStrategy of this.queryParamStrategies) {
      if (queryParamStrategy.is(value)) {
        const v = queryParamStrategy.extractValue(value);

        if (Array.isArray(v)) return this.validate(v, args);

        return this.isValidNumber(v, args);
      }
    }

    return this.isValidNumber(value, args);
  }
  defaultMessage(args: ValidationArguments) {
    return `Значение поля ${args.property} должно быть в диапазоне от ${args.constraints[0]} до ${args.constraints[1]}!`;
  }

  private isValidNumber(value: any, args: ValidationArguments): boolean {
    if (value === undefined || value === null || value === '') return false;

    return value >= args.constraints[0] && value <= args.constraints[1];
  }
}
