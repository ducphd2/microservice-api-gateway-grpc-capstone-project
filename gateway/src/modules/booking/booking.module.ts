import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientGrpcProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { EGrpcClientService } from '../../enums';
import { UtilsModule } from '../../utils/utils.module';
import { BookingMutationResolver } from './booking-mutation.resolver';

@Module({
  imports: [UtilsModule, ConfigModule],
  providers: [
    BookingMutationResolver,
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
  exports: [EGrpcClientService.BOOKING_SERVICE],
})
export class BookingModule {}
