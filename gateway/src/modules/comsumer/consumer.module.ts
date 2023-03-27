import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { EBullQueue } from '../../enums/queue-event.enum';

import { NotificationQueueProcessor } from './notification.consumer';
import { PubSubModule } from '../pubsub-subscription.module.ts/pubsub.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: EBullQueue.GATEWAY_QUEUE,
    }),
    PubSubModule,
  ],
  providers: [NotificationQueueProcessor],
})
export class BullConsumerModule {}
