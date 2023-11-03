import { IQueryParamStrategy, QueryParamStrategyFactory } from './query-param.strategy';
import { RangeQueryParamStrategy } from './range-query-param.strategy';
import { IncludeQueryParamStrategy } from './include-query-param.strategy';
import { ExcludeQueryParamStrategy } from './exclude-query-param.strategy';
import { DefaultQueryParamStrategy } from './default-query-param.strategy';

describe('QueryParamStrategyFactory', () => {
  it('should create an instance of ExcludeQueryParamStrategy when ExcludeQueryParam is passed', () => {
    const strategy: IQueryParamStrategy = QueryParamStrategyFactory.create('!value');
    expect(strategy).toBeInstanceOf(ExcludeQueryParamStrategy);
  });

  it('should create an instance of IncludeQueryParamStrategy when IncludeQueryParam is passed', () => {
    const strategy: IQueryParamStrategy = QueryParamStrategyFactory.create('+value');
    expect(strategy).toBeInstanceOf(IncludeQueryParamStrategy);
  });

  it('should create an instance of RangeQueryParamStrategy when RangeQueryParam is passed', () => {
    const strategy: IQueryParamStrategy = QueryParamStrategyFactory.create('1-10');
    expect(strategy).toBeInstanceOf(RangeQueryParamStrategy);
  });

  it('should create an instance of DefaultQueryParamStrategy when an unknown value is passed', () => {
    const strategy: IQueryParamStrategy = QueryParamStrategyFactory.create('value');
    expect(strategy).toBeInstanceOf(DefaultQueryParamStrategy);
  });

  it('should create with ExcludeQueryParamStrategy strategy when ExcludeQueryParam is passed', () => {
    const strategy: IQueryParamStrategy = QueryParamStrategyFactory.createWithStrategies('!value', [new ExcludeQueryParamStrategy()]);
    expect(strategy).toBeInstanceOf(ExcludeQueryParamStrategy);
  });

  it('should create with IncludeQueryParamStrategy strategy when IncludeQueryParam is passed', () => {
    const strategy: IQueryParamStrategy = QueryParamStrategyFactory.createWithStrategies('+value', [new IncludeQueryParamStrategy()]);
    expect(strategy).toBeInstanceOf(IncludeQueryParamStrategy);
  });

  it('should create with empty strategy when an unknown value is passed', () => {
    const strategy: IQueryParamStrategy = QueryParamStrategyFactory.createWithStrategies('value', []);
    expect(strategy).toBeInstanceOf(DefaultQueryParamStrategy);
  });
});

describe('ExcludeQueryParamStrategy', () => {
  const excludeQueryParamStrategy = new ExcludeQueryParamStrategy();

  it('should return true when the value starts with ExcludeQueryParam', () => {
    const value = '!value';
    expect(excludeQueryParamStrategy.is(value)).toBe(true);
  });

  it('should return false when the value does not start with ExcludeQueryParam', () => {
    const value = 'value';
    expect(excludeQueryParamStrategy.is(value)).toBe(false);
  });

  it('should return the value without ExcludeQueryParam when the value is a string', () => {
    const value = '!value';
    expect(excludeQueryParamStrategy.extractValue(value)).toBe('value');
  });

  it('should return the value without ExcludeQueryParam when the value is an array', () => {
    const value = ['!value1', '!value2'];
    expect(excludeQueryParamStrategy.extractValue(value)).toEqual(['value1', 'value2']);
  });

  it('should return buildWhere with $ne when the value is a string', () => {
    const value = '!value';
    expect(excludeQueryParamStrategy.buildWhere('key', value)).toEqual({ key: { $ne: 'value' } });
  });

  it('should return buildWhere with $nin when the value is an array', () => {
    const value = ['!value1', '!value2'];
    expect(excludeQueryParamStrategy.buildWhere('key', value)).toEqual({ key: { $nin: ['value1', 'value2'] } });
  });
});

describe('IncludeQueryParamStrategy', () => {
  const includeQueryParamStrategy = new IncludeQueryParamStrategy();

  it('should return true when the value starts with IncludeQueryParam', () => {
    const value = '+value';
    expect(includeQueryParamStrategy.is(value)).toBe(true);
  });

  it('should return false when the value does not start with IncludeQueryParam', () => {
    const value = 'value';
    expect(includeQueryParamStrategy.is(value)).toBe(false);
  });

  it('should return the value without IncludeQueryParam when the value is a string', () => {
    const value = '+value';
    expect(includeQueryParamStrategy.extractValue(value)).toBe('value');
  });

  it('should return the value without IncludeQueryParam when the value is an array', () => {
    const value = ['+value1', '+value2'];
    expect(includeQueryParamStrategy.extractValue(value)).toEqual(['value1', 'value2']);
  });

  it('should return buildWhere with $all when the value is a string', () => {
    const value = '+value';
    expect(includeQueryParamStrategy.buildWhere('key', value)).toEqual({ key: 'value' });
  });

  it('should return buildWhere with $all when the value is an array', () => {
    const value = ['+value1', '+value2'];
    expect(includeQueryParamStrategy.buildWhere('key', value)).toEqual({ key: { $all: ['value1', 'value2'] } });
  });
});

describe('RangeQueryParamStrategy', () => {
  const rangeQueryParamStrategy = new RangeQueryParamStrategy();

  it('should return true when the value starts with RangeQueryParam', () => {
    const value = '1-10';
    expect(rangeQueryParamStrategy.is(value)).toBe(true);
  });

  it('should return false when the value does not start with RangeQueryParam', () => {
    const value = 'value';
    expect(rangeQueryParamStrategy.is(value)).toBe(false);
  });

  it('should return the value without RangeQueryParam when the value is a string', () => {
    const value = '1-10';
    expect(rangeQueryParamStrategy.extractValue(value)).toEqual(['1', '10']);
  });

  it('should return the value without RangeQueryParam when the value is an array', () => {
    const value = ['1-10', '11-20'];
    expect(rangeQueryParamStrategy.extractValue(value)).toEqual(['1', '10', '11', '20']);
  });

  it('should return buildWhere with $gte and $lte when the value is a string', () => {
    const value = '1-10';
    expect(rangeQueryParamStrategy.buildWhere('key', value)).toEqual({ key: { $gte: '1', $lte: '10' } });
  });

  it('should return buildWhere with $gte and $lte when the value is an array', () => {
    const value = ['1-10', '11-20'];
    expect(rangeQueryParamStrategy.buildWhere('key', value)).toEqual({ key: { $gte: '1', $lte: '10' } });
  });
});
