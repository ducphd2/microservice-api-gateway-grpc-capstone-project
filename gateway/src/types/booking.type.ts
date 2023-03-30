import { Field, InputType, Int, ObjectType, PartialType } from '@nestjs/graphql';
import { EBookingStatus } from '../enums';
import { BaseType, ErrorPayload, IErrorPayload, PageInfo } from './base.type';

@ObjectType()
export class Booking extends BaseType {
  @Field(() => EBookingStatus)
  readonly status: EBookingStatus;

  @Field(() => Int)
  readonly customerId: number;

  @Field(() => Int)
  readonly branchServiceId: number;

  @Field(() => Int, { nullable: true })
  readonly duration: number;

  @Field()
  readonly startTime: string;

  @Field()
  readonly endTime: string;

  @Field({ nullable: true })
  readonly note: string;
}

@InputType()
export class CreateBookingInput {
  @Field(() => EBookingStatus)
  readonly status: EBookingStatus;

  @Field(() => Int)
  readonly customerId: number;

  @Field(() => Int)
  readonly branchServiceId: number;

  @Field(() => Int)
  readonly duration: number;

  @Field()
  readonly startTime: string;

  @Field()
  readonly endTime: string;

  @Field()
  readonly adminBranchEmail: string;

  @Field()
  readonly customerEmail: string;

  @Field()
  readonly customerName: string;
}

@ObjectType()
export class BookingPayload {
  @Field(() => [ErrorPayload], { nullable: true })
  errors?: IErrorPayload[];

  @Field(() => Booking, { nullable: true })
  booking?: Booking;
}

@ObjectType()
export class BookingEdge {
  @Field(() => Booking)
  node: Booking;

  @Field(() => String)
  cursor: string;
}

@ObjectType()
export class BookingsConnection {
  @Field(() => [BookingEdge])
  edges: BookingEdge[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

@ObjectType()
export class DeleteBookingPayload {
  @Field(() => [ErrorPayload], { nullable: true })
  errors?: ErrorPayload[];

  @Field(() => Int, { nullable: true })
  count?: number;
}

@InputType()
export class PartialUpdateBooking extends PartialType<CreateBookingInput>(CreateBookingInput) {}

@InputType()
export class CustomerCreateBookingInput {
  @Field(() => Int)
  readonly branchServiceId: number;

  @Field({ nullable: true })
  readonly note: string;

  @Field(() => Int, { nullable: true })
  readonly duration: number;

  @Field()
  readonly startTime: string;

  @Field()
  readonly endTime: string;
}
