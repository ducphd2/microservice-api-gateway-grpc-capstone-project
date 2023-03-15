import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { MerchantResolver } from './merchant.resolver';
import { MerchantService } from './merchant.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MERCHANT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50000',
          package: 'merchant',
          protoPath: join(__dirname, '../../protos/merchant.proto'),
        },
      },
    ]),
  ],
  providers: [MerchantResolver, MerchantService],
  exports: [MerchantService],
})
export class MerchantModule {}
