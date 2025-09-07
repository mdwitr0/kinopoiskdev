import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { QueryParamStrategyFactory } from '../query-builder/query-param-strategy/query-param.strategy';
import { ExcludeQueryParamStrategy } from '../query-builder/query-param-strategy/exclude-query-param.strategy';
import { IncludeQueryParamStrategy } from '../query-builder/query-param-strategy/include-query-param.strategy';

@ValidatorConstraint({ name: 'isStartWith', async: false })
export class IsStartWith implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (Array.isArray(value)) return value.every((item) => this.validate(item, args));

    const strategy = QueryParamStrategyFactory.createWithStrategies(value, [new ExcludeQueryParamStrategy(), new IncludeQueryParamStrategy()]);

    return this.isValidString(strategy.extractValue(value) as string, args);
  }
  defaultMessage(args: ValidationArguments) {
    return `Значение поля ${args.property} должно начинаться с ${args.constraints[0]}!`;
  }

  private isValidString(value: string, args: ValidationArguments): boolean {
    if (value === undefined || value === null || value === '') return false;

    return value.startsWith(args.constraints[0]);
  }
}
