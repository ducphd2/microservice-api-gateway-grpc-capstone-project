import { IUserDto } from './users.dto';

export interface ICustomerDto extends IUserDto {
  id?: number;
  fullName?: string;
  email?: string;
  password?: string;
  createdAt?: number;
  updatedAt?: number;
  version?: number;
  dobDay?: number;
  dobMonth?: number;
  dobYear?: number;
  occupation?: string;
  avatar?: string;
  status?: string;
  role?: string;
  gender?: string;
  contact?: string;
  referrer?: string;
  referrerCode?: string;
}
