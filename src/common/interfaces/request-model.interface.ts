import { Pagination } from '../query-builder/pagination-builder';
import { Select } from '../query-builder/select-builder';
import { Filter } from '../query-builder/filter-builder';
import { SortOrder } from 'mongoose';

export interface IRequestModel {
  model2Where(): Filter;
  model2Select(): Select;
  model2Sort(): { [key: string]: SortOrder };
  model2Pagination(): Pagination;
}
