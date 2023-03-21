import { FindAttributeOptions, WhereOptions } from 'sequelize';

export interface IId {
  id: number;
}

export interface IQuery {
  select?: string[];
  where?: string;
  orderBy?: string[];
  limit?: number;
  before?: string;
  after?: string;
}

export interface ICount {
  count: number;
}

export interface IEdge<T> {
  node: T;
  cursor: string;
}

export interface IPageInfo {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface IFindPayload<T> {
  edges: IEdge<T>[];
  pageInfo: IPageInfo;
}

export interface IFindAndPaginateOptions {
  attributes: FindAttributeOptions;
  where: WhereOptions;
  order: string[];
  limit: number;
  before: string;
  after: string;
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
