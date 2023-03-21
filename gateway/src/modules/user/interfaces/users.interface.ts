import { IModelConnection, IModelEdge, IPageInfo } from '../../../interfaces';
import { IErrorPayload } from '../../../types/base.type';
import { InputRegisterRequest } from '../dtos/inputRegisterRequest.dto';

export interface IUser {
  id?: number;
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
  createdAt?: string;
  updatedAt?: string;
}

export interface IUserPayload {
  errors?: IErrorPayload[];
  user?: IUser;
}

export interface IUserConn extends IModelConnection<IUser> {
  edges: IModelEdge<IUser>[];
  pageInfo: IPageInfo;
}

export class UpdateDataRequest {
  id: number;
  data: Partial<InputRegisterRequest>;
}
