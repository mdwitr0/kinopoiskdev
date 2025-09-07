import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { QueryParamStrategyFactory } from '../query-builder/query-param-strategy/query-param.strategy';
import { ExcludeQueryParamStrategy } from '../query-builder/query-param-strategy/exclude-query-param.strategy';
import { IncludeQueryParamStrategy } from '../query-builder/query-param-strategy/include-query-param.strategy';

@ValidatorConstraint({ name: 'isLengthExact', async: false })
export class IsLengthExact implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (Array.isArray(value)) return value.every((item) => this.validate(item, args));

    const strategy = QueryParamStrategyFactory.createWithStrategies(value, [new ExcludeQueryParamStrategy(), new IncludeQueryParamStrategy()]);

    return this.isValidString(strategy.extractValue(value), args);
  }
  defaultMessage(args: ValidationArguments) {
    return `Значение поля ${args.property} должно быть длиной ${args.constraints[0]} символов!`;
  }

  private isValidString(value: any, args: ValidationArguments): boolean {
    if (value === undefined || value === null || value === '') return false;
    return value.length === args.constraints[0];
  }
}
