import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { QueryParamStrategyFactory } from '../query-builder/query-param-strategy/query-param.strategy';

@ValidatorConstraint({ name: 'isValueInRange', async: false })
export class IsValueInRange implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (Array.isArray(value)) return value.every((item) => this.validate(item, args));
    if (typeof value === 'number') return this.isValidNumber(value, args);

    const strategy = QueryParamStrategyFactory.create(value);

    return this.isValidNumber(strategy.extractValue(value), args);
  }
  defaultMessage(args: ValidationArguments) {
    return `Значение поля ${args.property} должно быть в диапазоне от ${args.constraints[0]} до ${args.constraints[1]}!`;
  }

  private isValidNumber(value: any, args: ValidationArguments): boolean {
    if (value === undefined || value === null || value === '') return false;

    return value >= args.constraints[0] && value <= args.constraints[1];
  }
}
