import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientGrpcProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { EGrpcClientService } from '../../enums';
import { UtilsModule } from '../../utils/utils.module';
import { BranchServicesMutationResolver } from './branch-service-mutation.resolver';
import { BranchServicesQueryResolver } from './branch-service-query.resolver';
import { BranchServicesService } from './branch-service.service';

@Module({
  imports: [ConfigModule, UtilsModule],
  providers: [
    BranchServicesMutationResolver,
    BranchServicesQueryResolver,
    BranchServicesService,
    {
      provide: EGrpcClientService.BRANCH_SERVICE_GRPC,
      useFactory: (configService: ConfigService): ClientGrpcProxy => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('MERCHANTS_SVC_URL'),
            package: 'branch_service',
            protoPath: join(__dirname, '../../protos/branch_service.proto'),
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
  exports: [BranchServicesService, EGrpcClientService.BRANCH_SERVICE_GRPC],
})
export class BranchServicesModule {}
