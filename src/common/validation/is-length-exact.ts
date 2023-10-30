import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { IQueryParamStrategy, QueryParamStrategyFactory } from '../query-builder/query-param-strategy/query-param.strategy';
import { ExcludeQueryParam } from '../query-builder/query-param-strategy/exclude-query-param.strategy';
import { IncludeQueryParam } from '../query-builder/query-param-strategy/include-query-param.strategy';

@ValidatorConstraint({ name: 'isLengthExact', async: false })
export class IsLengthExact implements ValidatorConstraintInterface {
  private queryParamStrategies: IQueryParamStrategy[] = [];
  constructor() {
    this.queryParamStrategies = [ExcludeQueryParam, IncludeQueryParam].map((strategy) => QueryParamStrategyFactory.create(strategy));
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
    return `Значение поля ${args.property} должно быть длиной ${args.constraints[0]} символов!`;
  }

  private isValidString(value: any, args: ValidationArguments): boolean {
    if (value === undefined || value === null || value === '') return false;
    return value.length === args.constraints[0];
  }
}
