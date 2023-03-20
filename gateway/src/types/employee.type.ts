import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from './user.type';

export enum EEmployeePosition {
  cashier = 'cashier',
  worker = 'worker',
  receptionist = 'receptionist',
  manager = 'manager',
}

registerEnumType(EEmployeePosition, {
  name: 'EEmployeePosition',
});

@ObjectType()
export class Employee extends User {
  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  branchId: number;

  @Field(() => EEmployeePosition)
  position: EEmployeePosition;

  @Field(() => Boolean)
  isActive: boolean;
}
