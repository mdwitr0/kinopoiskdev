import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'AreArrayLengthsEqual', async: false })
export class AreArrayLengthsEqual implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const relatedPropertyName = args.constraints[0];
    const relatedValue = (args.object as any)[relatedPropertyName];
    return Array.isArray(value) && Array.isArray(relatedValue) && value.length === relatedValue.length;
  }

  defaultMessage(args: ValidationArguments) {
    const relatedPropertyName = args.constraints[0];
    return `${args.property} и ${relatedPropertyName} должны быть одинаковой длины!`;
  }
}
