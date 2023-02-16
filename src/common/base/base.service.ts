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
      this.model.countDocuments(query.filter).limit(query.limit),
      this.model
        .find(query.filter)
        .limit(query.limit)
        .skip(query.skip)
        .sort(query.sort),
    ]);

    return {
      docs,
      total,
      limit: query.limit,
      page: query.skip / query.limit + 1,
      pages: Math.ceil(total / query.limit),
    };
  }

  async findOne(id: number): Promise<T | null> {
    return this.model.findOne({ id }).lean();
  }
}
