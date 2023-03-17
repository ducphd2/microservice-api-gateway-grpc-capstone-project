import { Field, InputType } from '@nestjs/graphql';

export interface ICustomerDto {
  readonly id?: number;
  readonly fullName?: string;
  readonly email?: string;
  readonly password?: string;
  readonly createdAt?: number;
  readonly updatedAt?: number;
  readonly version?: number;
  readonly dobDay?: number;
  readonly dobMonth?: number;
  readonly dobYear?: number;
  readonly occupation?: string;
  readonly avatar?: string;
  readonly status?: string;
  readonly role?: string;
  readonly gender?: string;
  readonly contact?: string;
}

@InputType()
export class CustomerDto implements ICustomerDto {
  @Field()
  readonly id?: number;

  @Field()
  readonly fullName?: string;

  @Field()
  readonly email?: string;

  @Field()
  readonly password?: string;

  @Field()
  readonly createdAt?: number;

  @Field()
  readonly updatedAt?: number;

  @Field()
  readonly version?: number;

  @Field()
  readonly dobDay?: number;

  @Field()
  readonly dobMonth?: number;

  @Field()
  readonly dobYear?: number;

  @Field()
  readonly occupation?: string;

  @Field()
  readonly avatar?: string;

  @Field()
  readonly status?: string;

  @Field()
  readonly role?: string;

  @Field()
  readonly gender?: string;

  @Field()
  readonly contact?: string;
}
