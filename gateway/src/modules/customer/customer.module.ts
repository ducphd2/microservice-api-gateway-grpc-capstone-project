import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientGrpcProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { EGrpcClientService } from '../../enums/grpc-services.enum';
import { UtilsModule } from '../../utils/utils.module';
import { UserModule } from '../user/user.module';
import { CustomersMutationResolver } from './customer-mutation.resolver';
import { CustomerQueryResolver } from './customer-query.resolver';
import { AuthModule } from '../../auth/auth.module';
import { CustomerService } from './customer.service';

@Module({
  imports: [UtilsModule, ConfigModule, UserModule, AuthModule],
  providers: [
    CustomerService,
    CustomerQueryResolver,
    CustomersMutationResolver,
    {
      provide: EGrpcClientService.CUSTOMER_SERVICE,
      useFactory: (configService: ConfigService): ClientGrpcProxy => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('USERS_SVC_URL'),
            package: ['customer', 'user'],
            protoPath: [join(__dirname, '../../protos/customer.proto'), join(__dirname, '../../protos/user.proto')],
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [EGrpcClientService.CUSTOMER_SERVICE, CustomerService],
})
export class CustomerModule {}
