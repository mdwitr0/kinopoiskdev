import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isNumber', async: false })
export class IsNumber implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return typeof value === 'number' || (Array.isArray(value) && value.every((item) => typeof item === 'number'));
  }
  defaultMessage(args: ValidationArguments) {
    return `Поле ${args.property} должно быть числом или массивом чисел!`;
  }
}
