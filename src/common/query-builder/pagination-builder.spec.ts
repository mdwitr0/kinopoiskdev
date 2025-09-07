import { PaginationBuilder } from './pagination-builder';

describe('PaginationBuilder', () => {
  it('should build a pagination object', () => {
    const paginationBuilder = new PaginationBuilder();
    const pagination = paginationBuilder.build(1, 10);
    expect(pagination).toEqual({ limit: 10, skip: 0 });
  });

  it('should return an empty object', () => {
    const paginationBuilder = new PaginationBuilder();
    const pagination = paginationBuilder.build(null, null);
    expect(pagination).toEqual({ limit: 10, skip: 0 });
  });
});
