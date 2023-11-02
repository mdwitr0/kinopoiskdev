import { FilterBuilder } from './filter-builder';

describe('FilterBuilder', () => {
  it('should return where object', () => {
    const tests = [
      {
        key: 'id',
        input: ['!555', '!554', '666', '553-665'],
        expected: { $or: [{ id: { $in: [666] } }, { id: { $nin: [555, 554], $gte: 553, $lte: 665 } }] },
      },
      {
        key: 'id',
        input: ['!555', '!554', '666', '553-'],
        expected: {
          $or: [{ id: { $in: [666] } }, { id: { $nin: [555, 554], $gte: 553 } }],
        },
      },
      {
        key: 'id',
        input: ['666'],
        expected: {
          $or: [{ id: { $in: [666] } }],
        },
      },
      {
        key: 'id',
        input: ['!666'],
        expected: {
          $or: [{ id: { $nin: [666] } }],
        },
      },
      {
        key: 'id',
        input: ['666-'],
        expected: {
          $or: [{ id: { $gte: 666 } }],
        },
      },
      {
        key: 'id',
        input: ['-666'],
        expected: {
          $or: [{ id: { $lte: 666 } }],
        },
      },
      {
        key: 'id',
        input: ['666-777'],
        expected: {
          $or: [{ id: { $gte: 666, $lte: 777 } }],
        },
      },
      {
        key: 'id',
        input: ['666-777', '888-999'],
        expected: {
          $or: [{ id: { $gte: 666, $lte: 777 } }],
        },
      },
    ];

    for (const test of tests) {
      const filter = new FilterBuilder();
      filter.setByNumber(test.key, test.input);
      const where = filter.build();
      expect(where).toEqual(test.expected);
    }
  });
});
