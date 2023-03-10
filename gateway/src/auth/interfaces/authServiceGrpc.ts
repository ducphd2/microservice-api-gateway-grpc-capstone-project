import { Field, ObjectType } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { Merchant, MerchantBranch, User } from '../../types';
import { Profile } from '../../types/profile.type';
import { InputLoginRequest } from '../dtos/inputLoginRequest.dto';
import { InputPermissionRequest } from '../dtos/inputPermissionRequest.dto';
import { InputRegisterRequest } from '../dtos/inputRegisterRequest.dto';
import { AuthFromGrpcMerchantResponse } from '../../merchant/interfaces/merchantServiceGrpc';

@ObjectType()
export class ResponseUserAuthFromGrpc {
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
  register(data: InputRegisterRequest): Observable<ResponseUserAuthFromGrpc>;
  login(data: InputLoginRequest): Observable<ResponseAuthFromGrpc>;
  isAdmin(data: InputPermissionRequest): Observable<ResponsePermission>;
}

@ObjectType()
export class ResponseAuthFromGrpc {
  @Field(() => User)
  user: User;

  @Field(() => Profile)
  profile: Profile;

  @Field(() => Merchant)
  merchant?: Merchant;

  @Field(() => MerchantBranch)
  merchantBranch?: MerchantBranch;

  @Field(() => String)
  accessToken: string;
}
