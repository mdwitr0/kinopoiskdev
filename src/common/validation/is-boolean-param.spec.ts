import { ValidationArguments } from 'class-validator';
import { IsBooleanParam } from './is-boolean-param';

describe('IsBooleanParam', () => {
  let isBooleanParam: IsBooleanParam;
  let validationArguments: ValidationArguments;

  beforeEach(() => {
    isBooleanParam = new IsBooleanParam();
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
    { value: true, expected: true },
    { value: false, expected: false },
    { value: 'true', expected: true },
    { value: 'false', expected: false },
    { value: 'True', expected: true },
    { value: 'False', expected: false },
    { value: 'TRUE', expected: true },
    { value: 'FALSE', expected: false },
    { value: 1, expected: false },
    { value: 0, expected: false },
    { value: '12342', expected: false },
    { value: 'sdfg', expected: false },
    { value: null, expected: false },
    { value: undefined, expected: false },
  ];

  tests.forEach(({ value, expected }) => {
    it(`should ${expected ? 'accept' : 'reject'} ${value}`, () => {
      expect(isBooleanParam.validate(value, validationArguments)).toBe(expected);
    });
  });
});
