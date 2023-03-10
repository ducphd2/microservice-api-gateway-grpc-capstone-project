import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { MerchantModule } from '../merchant/merchant.module';
import { UtilsModule } from '../utils/utils.module';

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
    UtilsModule,
  ],
  providers: [AuthResolver, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
