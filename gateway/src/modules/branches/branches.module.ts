import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientGrpcProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { EGrpcClientService } from '../../enums';
import { UtilsModule } from '../../utils/utils.module';
import { BranchMutationResolver } from './branches-mutation.resolver';
import { BranchQueryResolver } from './branches-query.resolver';
import { MerchantBranchService } from './branches.service';

@Module({
  imports: [ConfigModule, UtilsModule],
  providers: [
    BranchMutationResolver,
    BranchQueryResolver,
    MerchantBranchService,
    {
      provide: EGrpcClientService.MERCHANT_BRANCH_SERVICE,
      useFactory: (configService: ConfigService): ClientGrpcProxy => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('MERCHANTS_SVC_URL'),
            package: ['merchant_branch'],
            protoPath: [join(__dirname, '../../protos/merchant_branch.proto')],
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
    {
      provide: EGrpcClientService.MERCHANT_SERVICE,
      useFactory: (configService: ConfigService): ClientGrpcProxy => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('MERCHANTS_SVC_URL'),
            package: ['merchant'],
            protoPath: [join(__dirname, '../../protos/merchant.proto')],
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
  exports: [MerchantBranchService, EGrpcClientService.MERCHANT_BRANCH_SERVICE],
})
export class MerchantBranchModule {}
