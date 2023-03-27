import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { EBullEvent, EBullQueue, ESubscriptionEvent } from '../../enums';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from '../pubsub-subscription.module.ts/pubsub.module';

@Processor(EBullQueue.GATEWAY_QUEUE)
export class NotificationQueueProcessor {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @Inject(PUB_SUB)
    private readonly pubSubService: PubSub,
  ) {}

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(`Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(job.data)}`);
  }

  @OnQueueCompleted()
  onComplete(job: Job, result: any) {
    this.logger.debug(`Completed job ${job.id} of type ${job.name}. Result: ${JSON.stringify(result)}`);
  }

  @OnQueueFailed()
  onError(job: Job<any>, error: any) {
    this.logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack);
  }

  @Process(EBullEvent.BOOKING_NOTIFICATION_EVENT)
  async handleBookingEvent(job: Job<any>): Promise<boolean> {
    // push notification to customer
    // then push notification to merchant/branch admin
    // then push notification to customer care department
    // In this case, I have just push notification via subscription to customer
    const body = job.data;
    this.logger.debug(`Emit event data to subscription in gateway by notification service: ${JSON.stringify(body)}`);
    await this.pubSubService.publish(ESubscriptionEvent.USER_BOOKING_PUSH_NOTIFICATION, {
      notification: body,
    });
    return true;
  }
}
