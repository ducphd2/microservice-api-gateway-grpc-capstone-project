import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientGrpcProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { EGrpcClientService } from '../../enums';
import { UtilsModule } from '../../utils/utils.module';
import { BranchServiceGroupModule } from '../service-groups/service-groups.module';
import { BranchServicesMutationResolver } from './services-mutation.resolver';
import { BranchServicesQueryResolver } from './services-query.resolver';
import { BranchServicesService } from './services.service';

@Module({
  imports: [ConfigModule, UtilsModule, BranchServiceGroupModule],
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
