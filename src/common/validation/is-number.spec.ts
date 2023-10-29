import { IsNumber } from './is-number';
import { ValidationArguments } from 'class-validator';

describe('IsNumber', () => {
  let isNumber: IsNumber;
  let validationArguments: ValidationArguments;

  beforeEach(() => {
    isNumber = new IsNumber();
    validationArguments = {
      constraints: [],
      property: 'testProperty',
      target: {},
      value: '',
      targetName: 'TestTarget',
      object: {},
    } as ValidationArguments;
  });

  it('should reject a string', () => {
    expect(isNumber.validate('1fff', validationArguments)).toBe(false);
  });

  it('should accept a number with ! in the beginning', () => {
    expect(isNumber.validate('!1234', validationArguments)).toBe(true);
  });

  it('should accept a number with + in the beginning', () => {
    expect(isNumber.validate('+1234', validationArguments)).toBe(true);
  });

  it('should accept a range number', () => {
    expect(isNumber.validate('10-20', validationArguments)).toBe(true);
  });

  it('should reject a string with ! at the beginning followed by number-range', () => {
    expect(isNumber.validate('!11-222', validationArguments)).toBe(false);
  });

  it('should reject a string with ! in the beginning followed by random characters and number', () => {
    expect(isNumber.validate('!dfgdfs54432', validationArguments)).toBe(false);
  });
});
