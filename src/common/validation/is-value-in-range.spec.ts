import { IsValueInRange } from './is-value-in-range';
import { ValidationArguments } from 'class-validator';

describe('IsValueInRange', () => {
  let minMax: IsValueInRange;
  let validationArguments: ValidationArguments;
  const range = [5, 10];

  beforeEach(() => {
    minMax = new IsValueInRange();
    validationArguments = {
      constraints: range,
      property: 'testProperty',
      target: {},
      value: '',
      targetName: 'TestTarget',
      object: {},
    } as ValidationArguments;
  });

  const tests = [
    { value: 7, expected: true },
    { value: 3, expected: false },
    { value: 12, expected: false },
    { value: '15', expected: false },
    { value: '25', expected: false },
    { value: '5', expected: true },
    { value: '!5', expected: true },
    { value: '+5', expected: true },
    { value: '!11-222', expected: false },
    { value: '!dfgdfs54432', expected: false },
    { value: '10-20', expected: false },
    { value: [6, 8], expected: true },
    { value: [3, 8], expected: false },
    { value: '!', expected: false },
    { value: '+', expected: false },
    { value: '-', expected: false },
    { value: '', expected: false },
  ];

  tests.forEach(({ value, expected }) => {
    it(`should ${expected ? 'accept' : 'reject'} ${value}`, () => {
      expect(minMax.validate(value, validationArguments)).toBe(expected);
    });
  });
});
