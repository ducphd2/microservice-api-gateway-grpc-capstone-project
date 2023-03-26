export interface IUser {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
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
}

export interface ICustomer {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  level?: string;
  branchId?: number;
  customerCode?: string;
  facebook?: string;
  zaloPhone?: string;
  height?: number;
  weight?: number;
  memberCardNo?: string;
  address?: string;
  cityCode?: number;
  districtCode?: number;
  company?: string;
  taxNo?: string;
  note?: string;
  relatedUser?: string;
  relatedUserRole?: string;
  relatedUserPhone?: string;
  referrer?: string;
  referrerCode?: string;
}

export interface IFindCustomerResponse {
  customer: ICustomer;
  user: IUser;
  admin?: IUser;
}
