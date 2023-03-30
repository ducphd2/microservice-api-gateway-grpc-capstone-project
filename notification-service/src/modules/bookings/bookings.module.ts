import { join } from 'path';

import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpcProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

import { EBullQueue } from '../../enums/queue-event.enum';
import { MailModule } from '../mailer/mailer.module';
import { EGrpcClientService } from '../../enums';
import { MerchantModule } from '../merchant/merchant.module';

import { BookingQueueProcessor } from './bookings.consumer';
import { NotificationToGatewayQueueProvider } from './bull-producer.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: EBullQueue.BOOKING_QUEUE,
    }),
    BullModule.registerQueue({
      name: EBullQueue.GATEWAY_QUEUE,
    }),
    MailModule,
    MerchantModule,
  ],
  providers: [
    {
      provide: EGrpcClientService.USER_SERVICE,
      useFactory: (configService: ConfigService): ClientGrpcProxy => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('USERS_SVC_URL'),
            package: 'notification',
            protoPath: join(__dirname, '../../protos/notification.proto'),
            loader: {
              keepCase: true,
              enums: String,
              oneofs: true,
              arrays: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
    BookingQueueProcessor,
    NotificationToGatewayQueueProvider,
  ],
})
export class BookingsModule {}
