import { IModelConnection, IModelEdge, IPageInfo } from '../../../interfaces';
import { IErrorPayload } from '../../../types/base.type';

export interface IUser {
  email?: string;
  password?: string;
  fullName?: string;
  status?: string;
  role?: string;
  gender?: string;
  contact?: string;
  dobDay?: number;
  dobMonth?: number;
  dobYear?: number;
  occupation?: string;
  avatar?: string;
  id?: number;
  createdAt?: number;
  updatedAt?: number;
}

export interface IUserPayload {
  errors?: IErrorPayload[];
  user?: IUser;
}

export interface IUserConn extends IModelConnection<IUser> {
  edges: IModelEdge<IUser>[];
  pageInfo: IPageInfo;
}
