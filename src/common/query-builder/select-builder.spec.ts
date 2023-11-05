import { SelectBuilder } from './select-builder';

describe('SelectBuilder', () => {
  it('should build a select object', () => {
    const sortBuilder = new SelectBuilder();
    const sort = sortBuilder.build(['name', 'age']);
    expect(sort).toEqual({ name: 1, age: 1 });
  });

  it('should return an empty object', () => {
    const sortBuilder = new SelectBuilder();
    const sort = sortBuilder.build([]);
    expect(sort).toEqual({});
  });

  it('should return an null', () => {
    const sortBuilder = new SelectBuilder();
    const sort = sortBuilder.build(null);
    expect(sort).toEqual({});
  });
});
