/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Model } from 'mongoose';
import { IQuery } from '../interfaces/query.interface';

export interface IFindMany<T> {
  docs: T[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export interface IBaseService<T> {
  findMany(query: IQuery): Promise<IFindMany<T>>;
  findOne(id: number): Promise<T | null>;
}

export abstract class BaseService<T> implements IBaseService<T> {
  protected constructor(protected readonly model: Model<T>) {}

  async findMany(query: IQuery): Promise<IFindMany<T>> {
    const [total, docs] = await Promise.all([
      this.model.countDocuments(query.filter),
      this.model
        .find(query.filter)
        .sort(Object.keys(query.sort)?.length ? { ...query.sort, _id: -1 } : { _id: -1 })
        .limit(query.limit)
        .skip(query.skip)
        .select(query.select)
        .allowDiskUse(true)
        .exec(),
    ]);

    // @ts-ignore
    const docsToJson = docs.map((doc) => doc?.toJSON());
    return {
      docs: docsToJson,
      total,
      limit: query.limit,
      page: query.skip / query.limit + 1,
      pages: Math.ceil(total / query.limit),
    };
  }

  async findOne(id: number | string): Promise<T | null> {
    const found = await this.model.findOne({ id });
    // @ts-ignore
    if (found) return found.toJSON();
    return found;
  }
}
