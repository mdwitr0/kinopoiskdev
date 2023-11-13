import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'IsBooleanParam', async: false })
export class IsBooleanParam implements ValidatorConstraintInterface {
  boolMap = {
    true: true,
    false: true,
  };
  validate(value: any, args: ValidationArguments) {
    if (Array.isArray(value)) return value.every((item) => this.validate(item, args));

    if (typeof value === 'boolean') return value;
    if (typeof value !== 'string') return false;

    return !!this.boolMap[value?.toLowerCase()];
  }
  defaultMessage(args: ValidationArguments) {
    return `Значение поля ${args.property} должно быть булевым!`;
  }
}
