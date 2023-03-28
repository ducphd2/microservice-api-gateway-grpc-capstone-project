import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientGrpcProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { EGrpcClientService } from '../../enums';
import { UtilsModule } from '../../utils/utils.module';
import { BranchServiceGroupMutationResolver } from './branch-service-group-mutation.resolver';
import { BranchServiceGroupQueryResolver } from './branch-service-group-query.resolver';
import { BranchServiceGroupService } from './branch-service-group.service';

@Module({
  imports: [ConfigModule, UtilsModule],
  providers: [
    BranchServiceGroupMutationResolver,
    BranchServiceGroupQueryResolver,
    BranchServiceGroupService,
    {
      provide: EGrpcClientService.BRANCH_SERVICE_GROUP_SERVICE,
      useFactory: (configService: ConfigService): ClientGrpcProxy => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('MERCHANTS_SVC_URL'),
            package: 'branch_service_group',
            protoPath: join(__dirname, '../../protos/branch_service_group.proto'),
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
  exports: [BranchServiceGroupService, EGrpcClientService.BRANCH_SERVICE_GROUP_SERVICE],
})
export class BranchServiceGroupModule {}
