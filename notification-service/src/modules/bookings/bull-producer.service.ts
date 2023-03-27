import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { JobOptions, Queue } from 'bull';

import { EBullQueue } from '../../enums';

@Injectable()
export class NotificationToGatewayQueueProvider {
  constructor(@InjectQueue(EBullQueue.GATEWAY_QUEUE) private gatewayQueue: Queue) {}

  async addBookingEvent<T = Record<string, any>>(eventName: string, eventData: T, options?: JobOptions) {
    return await this.gatewayQueue.add(eventName, eventData, options);
  }
}
