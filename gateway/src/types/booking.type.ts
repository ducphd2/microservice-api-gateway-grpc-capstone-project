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
  readonly merchantId: number;

  @Field(() => Int, { nullable: true })
  readonly branchId: number;

  @Field()
  readonly startTime: string;

  @Field()
  readonly endTime: string;

  @Field()
  readonly bookingDate: string;

  @Field({ nullable: true })
  readonly cancelReason: string;

  @Field({ nullable: true })
  readonly isCustomerCancel: boolean;

  @Field({ nullable: true })
  readonly isAdminUpdate: boolean;

  @Field(() => Int, { nullable: true })
  readonly adminUpdateId: number;

  @Field({ nullable: true })
  readonly note: string;

  @Field({ nullable: true })
  readonly serviceName: string;
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
export class DeleteBookingPayload {
  @Field(() => [ErrorPayload], { nullable: true })
  errors?: ErrorPayload[];

  @Field(() => Int, { nullable: true })
  count?: number;
}

@InputType()
export class PartialUpdateBooking extends PartialType<CreateBookingInput>(CreateBookingInput) {
  @Field(() => EBookingStatus)
  readonly status: EBookingStatus;

  @Field({ nullable: true })
  readonly cancelReason: string;

  @Field({ nullable: true })
  readonly isCustomerCancel: boolean;

  @Field({ nullable: true })
  readonly isAdminUpdate: boolean;

  @Field(() => Int, { nullable: true })
  readonly adminUpdateId: number;
}

@InputType()
export class CustomerCreateBookingInput {
  @Field(() => Int)
  readonly branchServiceId: number;

  @Field({ nullable: true })
  readonly note: string;

  @Field()
  readonly bookingDate: string;

  @Field()
  readonly startTime: string;

  @Field()
  readonly endTime: string;
}

@ObjectType()
export class BookingPaginationResponse {
  @Field(() => [ExtendResponseBooking])
  items: ExtendResponseBooking[];

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  totalPage: number;

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  limit: number;
}

export class UpdateBookingInput {
  @Field(() => Int)
  id: number;

  @Field(() => PartialUpdateBooking)
  data: PartialUpdateBooking;
}

@ObjectType()
export class ExtendResponseBooking extends Booking {
  @Field({ nullable: true })
  readonly customerEmail: string;

  @Field({ nullable: true })
  readonly customerName: string;

  @Field({ nullable: true })
  readonly customerAddress: string;
}
