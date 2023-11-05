import { ValidationArguments } from 'class-validator';
import { IsEnumParam } from './is-enum-param';

describe('IsEnumParam', () => {
  let isEnumParam: IsEnumParam;
  let validationArguments: ValidationArguments;
  enum TestEnum {
    test1 = 'test1',
    test2 = 'test2',
  }

  beforeEach(() => {
    isEnumParam = new IsEnumParam();
    validationArguments = {
      constraints: [TestEnum],
      property: 'testProperty',
      target: {},
      value: '',
      targetName: 'TestTarget',
      object: {},
    } as ValidationArguments;
  });

  const tests = [
    { value: 'test1', expected: true },
    { value: 'test2', expected: true },
    { value: 'test3', expected: false },
    { value: '!test1', expected: true },
    { value: '+test2', expected: true },
    { value: 'test1!', expected: false },
    { value: 'test2-test1', expected: false },
    { value: ['test1', 'test2'], expected: true },
    { value: ['test1', 'test3'], expected: false },
  ];

  tests.forEach(({ value, expected }) => {
    it(`should ${expected ? 'accept' : 'reject'} ${value}`, () => {
      expect(isEnumParam.validate(value, validationArguments)).toBe(expected);
    });
  });
});
