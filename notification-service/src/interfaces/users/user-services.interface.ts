import { Observable } from 'rxjs';

import { IFindCustomerResponse } from './user.interface';

export interface IQueryFromNotificationService {
  customerId: number;
  branchServiceId: number;
}

export interface IUserServiceGrpc {
  GetUserDataFromNotificationService(data: IQueryFromNotificationService): Observable<IFindCustomerResponse>;
}
