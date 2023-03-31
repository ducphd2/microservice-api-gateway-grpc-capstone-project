import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';

import { EBullEvent, EBullQueue } from '../../enums/queue-event.enum';
import { MailService } from '../mailer/mailer.service';
import { IBooking } from '../../interfaces';
import { MerchantService } from '../merchant/merchant.service';
import { UserGrpcService } from '../user-grpc/user-grpc.service';

import { NotificationToGatewayQueueProvider } from './bull-producer.service';

@Processor(EBullQueue.BOOKING_QUEUE)
export class BookingQueueProcessor {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly mailService: MailService,
    private readonly notificationToGatewayQueue: NotificationToGatewayQueueProvider,
    private readonly merchantService: MerchantService,
    private readonly userGrpcService: UserGrpcService,
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
  async handleBookingEvent(job: Job<IBooking>): Promise<boolean> {
    const body = job.data;

    // * Handle event data: call to merchant service to get detail merchant, branch, service detail by `branchServiceId`
    const { branch, merchant } = await this.merchantService.findMerchantAndBranchDetailByBranchServiceId({
      id: body.branchServiceId,
    });

    this.logger.log(`Handle successfully created booking event with data: ${JSON.stringify(body)}`);
    await Promise.all([
      this.mailService.sendSuccessBookingUserEmail(body, merchant, branch),
      this.mailService.sendSuccessBookingAdminBranchEmail(body, merchant, branch),
      this.notificationToGatewayQueue.addBookingEvent(EBullEvent.BOOKING_NOTIFICATION_EVENT, body),
    ]);
    return true;
  }

  @Process(EBullEvent.APPROVE_BOOKING_NOTIFICATION_EVENT)
  async handleApproveBookingEvent(job: Job<IBooking>): Promise<boolean> {
    const body = job.data;
    this.logger.log(`Handle admin approve booking event with data: ${JSON.stringify(body)}`);

    // * Handle event data: call to merchant service to get detail merchant, branch, service detail by `branchServiceId`
    const { user, customer } = await this.userGrpcService.notificationFindUserAndCustomerDetailByCustomerId({
      where: JSON.stringify({
        id: body.customerId,
      }),
    });

    // * Handle event data: call to merchant service to get detail merchant, branch, service detail by `branchServiceId`
    const { branch, merchant } = await this.merchantService.findMerchantAndBranchDetailByBranchServiceId({
      id: body.branchServiceId,
    });

    await Promise.all([
      this.mailService.sendApproveBookingUserEmail(body, merchant, branch, user, customer),
      // this.mailService.sendSuccessBookingAdminBranchEmail(body, merchant, branch),
      // this.notificationToGatewayQueue.addBookingEvent(EBullEvent.BOOKING_NOTIFICATION_EVENT, body),
    ]);
    return true;
  }
}
