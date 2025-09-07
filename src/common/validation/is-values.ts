import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isValues', async: false })
export class IsValues implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (Array.isArray(value)) return value.every((item) => args.constraints.includes(item));
    return args.constraints.includes(value);
  }
  defaultMessage(args: ValidationArguments) {
    return `Значение поля ${args.property} должно быть: ${args.constraints.join(', ')}!`;
  }
}
