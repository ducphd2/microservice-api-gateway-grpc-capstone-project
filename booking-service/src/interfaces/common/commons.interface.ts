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

export interface IQueryV2 {
  select?: string[];
  where?: string;
  orderBy?: string;
  orderDirection?: string;
  limit?: number;
  before?: string;
  after?: string;
  page?: number;
  offset?: number;
  searchKey?: string;
}
