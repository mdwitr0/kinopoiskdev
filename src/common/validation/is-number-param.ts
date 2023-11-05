import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { QueryParamStrategyFactory } from '../query-builder/query-param-strategy/query-param.strategy';

@ValidatorConstraint({ name: 'isNumberParam', async: false })
export class IsNumberParam implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (Array.isArray(value)) return value.every((item) => this.validate(item, args));
    if (typeof value === 'number') return this.isValidNumber(value);

    const strategy = QueryParamStrategyFactory.create(value);
    const extractedValue = strategy.extractValue(value);
    if (Array.isArray(extractedValue)) return extractedValue.every((item) => this.validate(item, args));
    return this.isValidNumber(strategy.extractValue(value));
  }
  defaultMessage(args: ValidationArguments) {
    return `Поле ${args.property} должно быть числом или массивом чисел!`;
  }

  private isValidNumber(value: any): boolean {
    if (value === undefined || value === null || value === '') return false;
    return !isNaN(Number(value));
  }
}
