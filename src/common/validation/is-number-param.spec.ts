import { IsNumberParam } from './is-number-param';
import { ValidationArguments } from 'class-validator';

describe('IsNumber', () => {
  let isNumber: IsNumberParam;
  let validationArguments: ValidationArguments;

  beforeEach(() => {
    isNumber = new IsNumberParam();
    validationArguments = {
      constraints: [],
      property: 'testProperty',
      target: {},
      value: '',
      targetName: 'TestTarget',
      object: {},
    } as ValidationArguments;
  });

  const tests = [
    { value: 7, expected: true },
    { value: '15', expected: true },
    { value: '!5', expected: true },
    { value: '+5', expected: true },
    { value: '10-20', expected: true },
    { value: [6, 8], expected: true },
    { value: '!dfgdfs54432', expected: false },
    { value: '!11-222', expected: false },
    { value: '!', expected: false },
    { value: '+', expected: false },
    { value: '-', expected: false },
    { value: '-25', expected: false },
    { value: '', expected: false },
  ];

  tests.forEach(({ value, expected }) => {
    it(`should ${expected ? 'accept' : 'reject'} ${value}`, () => {
      expect(isNumber.validate(value, validationArguments)).toBe(expected);
    });
  });
});
