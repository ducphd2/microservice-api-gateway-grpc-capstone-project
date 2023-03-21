import { Field, ObjectType } from '@nestjs/graphql';
import { Metadata } from 'grpc';
import { Observable } from 'rxjs';
import { User } from '../../../types';
import { CustomerDto } from '../dtos';
import { IId } from '../../../interfaces';

ObjectType();
export class ResponsePermission {
  @Field(() => Boolean)
  isAdmin: boolean;
}

export interface IUserServiceGrpc {
  findById(id: IId, metadata?: Metadata): Observable<UserFindByIdResponse>;
  update(data: UpdateDataRequest): Observable<UserFindByIdResponse>;
}

@ObjectType()
export class UserFindByIdResponse {
  @Field(() => User)
  user: User;
}

export class UpdateDataRequest {
  id: number;
  data: CustomerDto;
}
