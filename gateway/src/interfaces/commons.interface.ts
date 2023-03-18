export interface IModelConnection<T> {
  edges: IModelEdge<T>[];
  pageInfo: IPageInfo;
}

export interface IModelEdge<T> {
  node: T;
  cursor: string;
}

export interface IPageInfo {
  startCursor?: string;
  endCursor?: string;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}
