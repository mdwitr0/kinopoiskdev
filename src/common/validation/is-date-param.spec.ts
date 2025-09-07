import { ValidationArguments } from 'class-validator';
import { IsDateParam } from './is-date-param';

describe('IsDateParam', () => {
  let isDateParam: IsDateParam;
  let validationArguments: ValidationArguments;

  beforeEach(() => {
    isDateParam = new IsDateParam();
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
    { value: '01.01.2020', expected: true },
    { value: '31.12.2019', expected: true },
    { value: '31.12.2019-01.01.2020', expected: true },
    { value: '31.12.2019 23:59:59', expected: false },
    { value: '31.12.2019 23:59', expected: false },
    { value: '2019', expected: false },
    { value: '2019-12-31', expected: false },
    { value: '2019-12-31T23:59:59', expected: false },
  ];

  tests.forEach(({ value, expected }) => {
    it(`should ${expected ? 'accept' : 'reject'} ${value}`, () => {
      expect(isDateParam.validate(value, validationArguments)).toBe(expected);
    });
  });
});
