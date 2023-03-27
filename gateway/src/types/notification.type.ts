import { Field, ObjectType } from '@nestjs/graphql';
import { BaseType } from './base.type';

@ObjectType()
export class UserBookingNotification extends BaseType {
  @Field({ nullable: true })
  readonly status: string;

  @Field({ nullable: true })
  readonly customerId: number;

  @Field({ nullable: true })
  readonly branchServiceId: number;

  @Field({ nullable: true })
  readonly duration: number;

  @Field({ nullable: true })
  readonly startTime: string;

  @Field({ nullable: true })
  readonly endTime: string;
}

@ObjectType()
export class UserBookingNotificationSubscription {
  @Field(() => UserBookingNotification)
  readonly notification: UserBookingNotification;
}
