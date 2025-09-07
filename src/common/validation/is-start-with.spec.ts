import { ValidationArguments } from 'class-validator';
import { IsStartWith } from './is-start-with';

describe('IsStartWith', () => {
  let isStartWith: IsStartWith;
  let validationArguments: ValidationArguments;
  const startWith = 'tt';

  beforeEach(() => {
    isStartWith = new IsStartWith();
    validationArguments = {
      constraints: [startWith],
      property: 'testProperty',
      target: {},
      value: '',
      targetName: 'TestTarget',
      object: {},
    } as ValidationArguments;
  });

  const tests = [
    { value: 'tt', expected: true },
    { value: 'tt123', expected: true },
    { value: '!tt123', expected: true },
    { value: '+tt123', expected: true },
    { value: 'tt-tt', expected: true },
    { value: '123tt', expected: false },
    { value: '123', expected: false },
    { value: '123tt123', expected: false },
    { value: ['tt111', '555'], expected: false },
    { value: ['tt111', 'tt555'], expected: true },
  ];

  tests.forEach(({ value, expected }) => {
    it(`should ${expected ? 'accept' : 'reject'} ${value}`, () => {
      expect(isStartWith.validate(value, validationArguments)).toBe(expected);
    });
  });
});
