import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientGrpcProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { EGrpcClientService } from '../../enums';
import { UtilsModule } from '../../utils/utils.module';
import { BookingMutationResolver } from './booking.resolver';
import { MerchantModule } from '../merchant/merchant.module';
import { BranchServicesModule } from '../branch-service/branch-service.module';
import { UserModule } from '../user/user.module';
import { CustomerModule } from '../customer/customer.module';
import { BookingService } from './booking.service';

@Module({
  imports: [UtilsModule, ConfigModule, BranchServicesModule, UserModule, MerchantModule, CustomerModule],
  providers: [
    BookingMutationResolver,
    BookingService,
    {
      provide: EGrpcClientService.BOOKING_SERVICE,
      useFactory: (configService: ConfigService): ClientGrpcProxy => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('BOOKING_SVC_URL'),
            package: ['booking'],
            protoPath: [join(__dirname, '../../protos/booking.proto')],
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [EGrpcClientService.BOOKING_SERVICE, BookingService],
})
export class BookingModule {}
