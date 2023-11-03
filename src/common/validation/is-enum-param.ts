import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { QueryParamStrategyFactory } from '../query-builder/query-param-strategy/query-param.strategy';
import { ExcludeQueryParamStrategy } from '../query-builder/query-param-strategy/exclude-query-param.strategy';
import { IncludeQueryParamStrategy } from '../query-builder/query-param-strategy/include-query-param.strategy';

@ValidatorConstraint({ name: 'isEnumParam', async: false })
export class IsEnumParam implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (Array.isArray(value)) return value.every((item) => this.validate(item, args));

    const strategy = QueryParamStrategyFactory.createWithStrategies(value, [new ExcludeQueryParamStrategy(), new IncludeQueryParamStrategy()]);

    return this.isValidEnum(strategy.extractValue(value), args);
  }
  defaultMessage(args: ValidationArguments) {
    return `Поле ${args.property} должно быть значением из списка: ${Object.keys(args.constraints[0]).join(', ')}!`;
  }

  private isValidEnum(value: any, args: ValidationArguments): boolean {
    if (value === undefined || value === null) return false;
    if (value === '') return true;

    return !!args.constraints[0][value];
  }
}
