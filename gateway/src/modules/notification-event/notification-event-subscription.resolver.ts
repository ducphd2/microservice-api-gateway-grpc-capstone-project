import { Inject, Logger } from '@nestjs/common';
import { Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { ESubscriptionEvent } from '../../enums';
import { UserBookingNotificationSubscription } from '../../types';
import { PUB_SUB } from '../pubsub-subscription.module.ts/pubsub.module';

@Resolver()
export class NotificationEventSubscriptionResolver {
  private readonly logger = new Logger(this.constructor.name);
  constructor(
    @Inject(PUB_SUB)
    private readonly pubSubService: PubSub,
  ) {}

  @Subscription(() => UserBookingNotificationSubscription, {
    resolve: (value: UserBookingNotificationSubscription, args: any, context: any, info: any) => {
      return value;
    },
    filter: (payload: UserBookingNotificationSubscription, variables: Record<string, any>, context: any) => {
      return true;
    },
  })
  pushNotificationByGatewayViaSubscription(): AsyncIterator<unknown, any, undefined> {
    return this.pubSubService.asyncIterator(ESubscriptionEvent.USER_BOOKING_PUSH_NOTIFICATION);
  }
}
