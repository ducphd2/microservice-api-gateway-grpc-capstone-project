import { Module } from '@nestjs/common';
import { ClientGrpcProxy, ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { MerchantResolver } from './merchant-branch.resolver';
import { MerchantBranchService } from './merchant-branch.service';
import { MerchantQueryResolver } from './merchant-branch-query.resolver';
import { EGrpcClientService } from '../../enums';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UtilsModule } from '../../utils/utils.module';

@Module({
  imports: [ConfigModule, UtilsModule],
  providers: [
    MerchantResolver,
    MerchantQueryResolver,
    MerchantBranchService,
    {
      provide: EGrpcClientService.MERCHANT_BRANCH_SERVICE,
      useFactory: (configService: ConfigService): ClientGrpcProxy => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('MERCHANT_BRANCHES_SVC_URL'),
            package: 'merchant_branch',
            protoPath: join(__dirname, '../../protos/merchant_branch.proto'),
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
