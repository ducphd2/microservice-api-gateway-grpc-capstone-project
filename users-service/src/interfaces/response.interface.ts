import { WhereOptions } from 'sequelize';
import { FindAttributeOptions } from 'sequelize/types';

export interface IResponse {
  data?: any;
  success: boolean;
  code: number;
  message: string;
  errors?: string;
}

export interface IPaginationRes<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export interface IFindAndPaginateOptions {
  attributes?: FindAttributeOptions;
  where?: WhereOptions;
  order?: string[];
  limit?: number;
  before?: string;
  after?: string;
  page?: number;
  orderBy?: string;
  orderDirection?: string;
  offset?: number;
  keySearch?: string;
}
