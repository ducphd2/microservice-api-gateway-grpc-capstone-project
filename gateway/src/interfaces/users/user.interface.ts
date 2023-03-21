import { InputRegisterRequest } from '../../modules/user/dtos/inputRegisterRequest.dto';
import { IErrorPayload } from '../commons.interface';

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
  createdAt?: string;
  updatedAt?: string;
}

export interface IPageInfo {
  startCursor?: string;
  endCursor?: string;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}

export interface IUserEdge {
  node: IUser;
  cursor: string;
}

export interface IUsersConnection {
  edges: IUserEdge[];
  pageInfo: IPageInfo;
}

export interface IUserPayload {
  errors?: IErrorPayload[];
  user?: IUser;
}

export class UpdateDataRequest {
  id: number;
  data: Partial<InputRegisterRequest>;
}
