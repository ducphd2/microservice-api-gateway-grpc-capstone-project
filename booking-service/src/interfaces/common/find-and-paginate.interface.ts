import { WhereOptions, FindAttributeOptions } from 'sequelize';

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

export interface ICursor {
  before: string;
  after: string;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface IFindAndPaginateResult<T> {
  results: T[];
  cursors: ICursor;
}
