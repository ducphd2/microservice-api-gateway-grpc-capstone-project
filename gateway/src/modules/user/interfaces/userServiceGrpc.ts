import { Field, ObjectType } from '@nestjs/graphql';
import { InputRegisterRequest } from '../dtos/inputRegisterRequest.dto';

ObjectType();
export class ResponsePermission {
  @Field(() => Boolean)
  isAdmin: boolean;
}

export class UpdateDataRequest {
  id: number;
  data: Partial<InputRegisterRequest>;
}
