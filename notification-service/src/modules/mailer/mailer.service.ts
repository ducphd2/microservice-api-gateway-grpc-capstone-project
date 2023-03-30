import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

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

  async sendSuccessBookingUserEmail(userEmail: string, fullName: string) {
    return this.sendEmailViaSMTP({
      to: userEmail,
      subject: 'Successfully booked a health appointment',
      template: 'user-success-booking',
      context: {
        email: userEmail,
        fullName,
      },
    });
  }

  async sendSuccessBookingAdminBranchEmail(
    adminEmail: string,
    fullName: string,
    phoneNumber: string,
    customerEmail: string,
  ) {
    return this.sendEmailViaSMTP({
      to: adminEmail,
      subject: 'Successfully booked a health appointment',
      template: 'admin-success-booking',
      context: {
        customerEmail,
        fullName,
        phoneNumber,
      },
    });
  }
}
