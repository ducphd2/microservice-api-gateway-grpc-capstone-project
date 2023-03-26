import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { JobOptions, Queue } from 'bull';

import { EBullQueue } from '../../enums';

@Injectable()
export class BookingQueueProvider {
  constructor(@InjectQueue(EBullQueue.BOOKING_QUEUE) private bookingQueue: Queue) {}

  async addBookingEvent<T = Record<string, any>>(eventName: string, eventData: T, options?: JobOptions) {
    const a = await this.bookingQueue.add(eventName, eventData, options);
    return a;
  }
}
