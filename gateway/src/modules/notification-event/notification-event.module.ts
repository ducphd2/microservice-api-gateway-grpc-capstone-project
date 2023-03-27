import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotificationEventSubscriptionResolver } from './notification-event-subscription.resolver';
import { PubSubModule } from '../pubsub-subscription.module.ts/pubsub.module';

@Module({
  imports: [ConfigModule, PubSubModule],
  providers: [NotificationEventSubscriptionResolver],
  exports: [NotificationEventSubscriptionResolver],
})
export class NotificationEventModule {}
