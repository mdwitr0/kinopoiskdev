import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'minMax', async: false })
export class MinMax implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (Array.isArray(value)) return value.every((item) => item >= args.constraints[0] && item <= args.constraints[1]);
    return value >= args.constraints[0] && value <= args.constraints[1];
  }
  defaultMessage(args: ValidationArguments) {
    return `Значение поля ${args.property} должно быть в диапазоне от ${args.constraints[0]} до ${args.constraints[1]}!`;
  }
}
