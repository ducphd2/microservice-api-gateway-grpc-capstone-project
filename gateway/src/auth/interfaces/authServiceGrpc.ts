import { Field, ObjectType } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { User } from '../../types';
import { Profile } from '../../types/profile.type';
import { InputLoginRequest } from '../dtos/inputLoginRequest.dto';
import { InputPermissionRequest } from '../dtos/inputPermissionRequest.dto';
import { InputRegisterRequest } from '../dtos/inputRegisterRequest.dto';

@ObjectType()
export class ResponseAuthFromGrpc {
  @Field(() => User)
  user: User;

  @Field(() => Profile)
  profile: Profile;

  @Field(() => String)
  accessToken: string;
}

ObjectType();
export class ResponsePermission {
  @Field(() => Boolean)
  isAdmin: boolean;
}

export interface AuthServiceGrpc {
  register(data: InputRegisterRequest): Observable<ResponseAuthFromGrpc>;
  login(data: InputLoginRequest): Observable<ResponseAuthFromGrpc>;
  isAdmin(data: InputPermissionRequest): Observable<ResponsePermission>;
}
