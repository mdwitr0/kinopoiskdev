import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { normalizeDate } from '../utils/query/parse-date.util';
import { QueryParamStrategyFactory } from '../query-builder/query-param-strategy/query-param.strategy';

@ValidatorConstraint({ name: 'IsDateParam', async: false })
export class IsDateParam implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (Array.isArray(value)) return value.every((item) => this.validate(item, args));

    const strategy = QueryParamStrategyFactory.create(value);
    const v = strategy.extractValue(value);
    if (Array.isArray(v)) return v.every((item) => this.isValidDate(item));

    return this.isValidDate(strategy.extractValue(value));
  }
  defaultMessage(args: ValidationArguments) {
    return `Значение поля ${args.property} должно быть датой в формате dd.MM.yyyy!`;
  }

  private isValidDate(value: any): boolean {
    if (value === undefined || value === null || value === '') return false;
    try {
      return !!normalizeDate(value);
    } catch (e) {
      return false;
    }
  }
}
