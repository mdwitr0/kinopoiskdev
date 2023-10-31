import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { normalizeDate } from '../utils/query/parse-date.util';
import { IQueryParamStrategy, QueryParamStrategyFactory } from '../query-builder/query-param-strategy/query-param.strategy';
import { RangeQueryParam } from '../query-builder/query-param-strategy/range-query-param.strategy';

@ValidatorConstraint({ name: 'IsDateParam', async: false })
export class IsDateParam implements ValidatorConstraintInterface {
  private queryParamStrategies: IQueryParamStrategy[] = [];
  constructor() {
    this.queryParamStrategies = [RangeQueryParam].map((strategy) => QueryParamStrategyFactory.create(strategy));
  }
  validate(value: any, args: ValidationArguments) {
    if (Array.isArray(value)) return value.every((item) => this.validate(item, args));

    for (const queryParamStrategy of this.queryParamStrategies) {
      if (queryParamStrategy.is(value)) {
        const v = queryParamStrategy.extractValue(value);

        if (Array.isArray(v)) return this.validate(v, args);

        return this.isValidDate(v);
      }
    }

    return this.isValidDate(value);
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
