import { SortBuilder } from './sort-builder';

describe('SortBuilder', () => {
  it('should build a sort object', () => {
    const sortBuilder = new SortBuilder();
    const sort = sortBuilder.build(['name', 'age'], ['1', '-1']);
    expect(sort).toEqual({ name: 1, age: -1 });
  });

  it('should return an empty object', () => {
    const sortBuilder = new SortBuilder();
    const sort = sortBuilder.build([], []);
    expect(sort).toEqual({});
  });

  it('should return an null', () => {
    const sortBuilder = new SortBuilder();
    const sort = sortBuilder.build(null, null);
    expect(sort).toEqual({});
  });
});
