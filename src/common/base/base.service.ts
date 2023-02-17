/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Model } from 'mongoose';
import { IQuery } from '../interfaces/query.interface';

interface IFindMany<T> {
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
      this.model.find(query.filter).limit(query.limit).skip(query.skip).sort(query.sort).exec(),
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
    return found.toJSON();
  }
}
