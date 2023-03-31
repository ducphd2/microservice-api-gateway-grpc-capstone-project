import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

import { IBooking, ICustomer, IMerchant, IMerchantBranch, IUser } from '../../interfaces';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService) {}

  private async sendEmailViaSMTP(options: ISendMailOptions): Promise<void> {
    try {
      await this.mailerService.sendMail(options);
    } catch (error: unknown) {
      this.logger.error(`Can not send mail ${JSON.stringify({ options, error })}`);
    }
  }

  async sendSuccessBookingUserEmail(bookingData: IBooking, merchant: IMerchant, branch: IMerchantBranch) {
    const { customerEmail, customerName, startTime, endTime, bookingDate } = bookingData;
    const { name, address, phone } = branch;
    return this.sendEmailViaSMTP({
      to: customerEmail,
      subject: 'Successfully booked a health appointment',
      template: 'user-success-booking',
      context: {
        email: customerEmail,
        fullName: customerName,
        bookingDate: bookingDate,
        startTime: startTime,
        endTime: endTime,
        merchantName: name,
        merchantAddress: address,
        merchantPhoneNumber: phone,
      },
    });
  }

  async sendApproveBookingUserEmail(
    bookingData: IBooking,
    merchant: IMerchant,
    branch: IMerchantBranch,
    user: IUser,
    customer: ICustomer,
  ) {
    const { email, fullName } = user;
    const { startTime, endTime, bookingDate } = bookingData;
    const { name, address, phone } = branch;
    return this.sendEmailViaSMTP({
      to: email,
      subject: '<KMAHealthcare>Thông báo: Lịch hẹn chăm sóc sức khỏe',
      template: 'user-approved-booking',
      context: {
        email: email,
        fullName: fullName,
        bookingDate: bookingDate,
        startTime: startTime,
        endTime: endTime,
        merchantName: name,
        merchantAddress: address,
        merchantPhoneNumber: phone,
      },
    });
  }

  async sendSuccessBookingAdminBranchEmail(bookingData: IBooking, merchant: IMerchant, branch: IMerchantBranch) {
    const { customerEmail, customerName, startTime, endTime, bookingDate, customerPhoneNumber, adminBranchEmail } =
      bookingData;
    const { name, address, phone } = branch;
    return this.sendEmailViaSMTP({
      to: adminBranchEmail,
      subject: 'New customer booking appointment',
      template: 'admin-success-booking',
      context: {
        customerPhoneNumber: customerPhoneNumber,
        customerName: customerName,
        customerEmail: customerEmail,
        fullName: customerName,
        bookingDate: bookingDate,
        startTime: startTime,
        endTime: endTime,
        merchantName: name,
        merchantAddress: address,
        merchantPhoneNumber: phone,
      },
    });
  }
}
