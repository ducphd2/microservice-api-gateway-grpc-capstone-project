import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientGrpcProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { EGrpcClientService } from '../../enums/grpc-services.enum';
import { UtilsModule } from '../../utils/utils.module';
import { MerchantBranchModule } from '../merchant-branch/merchant-branch.module';
import { MerchantModule } from '../merchant/merchant.module';
import { UserFieldResolver } from './user-field.resolver';
import { UserMutationResolver } from './user-mutation.resolver';
import { UserQueryResolver } from './user-query.resolver';

@Module({
  imports: [ConfigModule, UtilsModule, MerchantModule, MerchantBranchModule],
  providers: [
    UserFieldResolver,
    UserQueryResolver,
    UserMutationResolver,
    {
      provide: EGrpcClientService.USER_SERVICE,
      useFactory: (configService: ConfigService): ClientGrpcProxy => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('USERS_SVC_URL'),
            package: 'user',
            protoPath: join(__dirname, '/../../protos/user.proto'),
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
  ],
  exports: [EGrpcClientService.USER_SERVICE],
})
export class UserModule {}
