import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';

import { EBullEvent, EBullQueue } from '../../enums/queue-event.enum';
import { MailService } from '../mailer/mailer.service';
import { IBooking } from '../../interfaces';

@Processor(EBullQueue.BOOKING_QUEUE)
export class BookingQueueProcessor {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly mailService: MailService) {}

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
  async handleBookingEvent(job: Job<IBooking>): Promise<boolean> {
    const body = job.data;
    Logger.log(`Queue EBullEvent.BOOKING_NOTIFICATION_EVENT with data: ${JSON.stringify(body)}`);
    await Promise.all([this.mailService.sendSuccessBookingUserEmail(body.customerEmail, body.customerName)]);
    return true;
  }
}
