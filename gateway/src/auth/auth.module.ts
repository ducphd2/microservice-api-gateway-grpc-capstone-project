import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UtilsModule } from '../utils/utils.module';
import { MerchantModule } from '../modules/merchant/merchant.module';
import { TestMerchantModule } from '../modules/test-merchant/test-merchant.module';

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
    MerchantModule,
    TestMerchantModule,
    UtilsModule,
  ],
  providers: [AuthResolver, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
