import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { MerchantModule } from '../merchant/merchant.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50001',
          package: 'user',
          protoPath: join(__dirname, '/../protos/user.proto'),
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'MERCHANT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50000',
          package: 'merchant',
          protoPath: join(__dirname, '/../protos/merchant.proto'),
        },
      },
    ]),
    MerchantModule,
  ],
  providers: [AuthResolver, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
