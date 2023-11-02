import { FilterBuilder } from './filter-builder';

describe('FilterBuilder', () => {
  it('should build filter by number', () => {
    const tests = [
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
    ];

    for (const test of tests) {
      const filter = new FilterBuilder();
      filter.setNumber(test.key, test.input);
      const where = filter.build();
      expect(where).toEqual(test.expected);
    }
  });

  it('should build filter by string', () => {
    const tests = [
      {
        key: 'genres.name',
        input: ['драма', 'комедия', '!ужасы', '+фантастика'],
        expected: {
          $or: [{ 'genres.name': { $in: ['драма', 'комедия'] } }, { 'genres.name': { $nin: ['ужасы'], $all: ['фантастика'] } }],
        },
      },
      {
        key: 'genres.name',
        input: ['драма'],
        expected: {
          $or: [{ 'genres.name': { $in: ['драма'] } }],
        },
      },
    ];

    for (const test of tests) {
      const filter = new FilterBuilder();
      filter.setString(test.key, test.input);
      const where = filter.build();
      expect(where).toEqual(test.expected);
    }
  });

  it('should build filter by boolean', () => {
    const tests = [
      {
        key: 'isSeries',
        input: ['true'],
        expected: {
          $or: [{ isSeries: true }],
        },
      },
      {
        key: 'isSeries',
        input: ['false'],
        expected: {
          $or: [{ isSeries: false }],
        },
      },
    ];

    for (const test of tests) {
      const filter = new FilterBuilder();
      filter.setBoolean(test.key, test.input);
      const where = filter.build();
      expect(where).toEqual(test.expected);
    }
  });

  it('should build filter by date', () => {
    const tests = [
      {
        key: 'releaseDate',
        input: ['01.01.2020', '02.01.2020'],
        expected: {
          $or: [{ releaseDate: { $in: [new Date('2020-01-01'), new Date('2020-01-02')] } }],
        },
      },
      {
        key: 'releaseDate',
        input: ['01.01.2020-02.01.2020'],
        expected: {
          $or: [{ releaseDate: { $gte: new Date('2020-01-01'), $lte: new Date('2020-01-02') } }],
        },
      },
      {
        key: 'releaseDate',
        input: ['01.01.2020-'],
        expected: {
          $or: [{ releaseDate: { $gte: new Date('2020-01-01') } }],
        },
      },
      {
        key: 'releaseDate',
        input: ['-01.01.2020'],
        expected: {
          $or: [{ releaseDate: { $lte: new Date('2020-01-01') } }],
        },
      },
      {
        key: 'releaseDate',
        input: ['01.01.2020', '02.01.2020', '03.01.2020-04.01.2020'],
        expected: {
          $or: [
            { releaseDate: { $in: [new Date('2020-01-01'), new Date('2020-01-02')] } },
            { releaseDate: { $gte: new Date('2020-01-03'), $lte: new Date('2020-01-04') } },
          ],
        },
      },
    ];

    for (const test of tests) {
      const filter = new FilterBuilder();
      filter.setDate(test.key, test.input);
      const where = filter.build();
      expect(where).toEqual(test.expected);
    }
  });

  it('should build filter by complex', () => {
    const filter = new FilterBuilder();
    filter.setNumber('id', ['666', '555-559']);
    filter.setString('genres.name', ['драма', 'комедия', '!ужасы', '+фантастика']);
    filter.setBoolean('isSeries', ['true']);
    filter.setDate('releaseDate', ['01.01.2020', '02.01.2020', '03.01.2020-04.01.2020']);
    const where = filter.build();

    expect(where).toEqual({
      $and: [
        { $or: [{ id: { $in: [666] } }, { id: { $gte: 555, $lte: 559 } }] },
        {
          $or: [{ 'genres.name': { $in: ['драма', 'комедия'] } }, { 'genres.name': { $nin: ['ужасы'], $all: ['фантастика'] } }],
        },
        { $or: [{ isSeries: true }] },
        {
          $or: [
            { releaseDate: { $in: [new Date('2020-01-01'), new Date('2020-01-02')] } },
            { releaseDate: { $gte: new Date('2020-01-03'), $lte: new Date('2020-01-04') } },
          ],
        },
      ],
    });
  });
});
