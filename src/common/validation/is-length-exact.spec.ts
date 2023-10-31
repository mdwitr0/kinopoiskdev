import { ValidationArguments } from 'class-validator';
import { IsLengthExact } from './is-length-exact';

describe('IsLengthExact', () => {
  let isLengthExact: IsLengthExact;
  let validationArguments: ValidationArguments;
  const len = 5;

  beforeEach(() => {
    isLengthExact = new IsLengthExact();
    validationArguments = {
      constraints: [len],
      property: 'testProperty',
      target: {},
      value: '',
      targetName: 'TestTarget',
      object: {},
    } as ValidationArguments;
  });

  const tests = [
    { value: '!qwert', expected: true },
    { value: '+qwert', expected: true },
    { value: 'qwert', expected: true },
    { value: 'qwert!', expected: false },
    { value: 'qw-+!', expected: true },
  ];

  tests.forEach(({ value, expected }) => {
    it(`should ${expected ? 'accept' : 'reject'} ${value}`, () => {
      expect(isLengthExact.validate(value, validationArguments)).toBe(expected);
    });
  });
});
