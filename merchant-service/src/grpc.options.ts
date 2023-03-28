import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:50002',
    package: ['merchant', 'merchant_branch', 'merchant_category', 'branch_service_group', 'branch_service'],
    protoPath: [
      join(__dirname, 'protos/merchant.proto'),
      join(__dirname, 'protos/merchant_branch.proto'),
      join(__dirname, 'protos/merchant_category.proto'),
      join(__dirname, 'protos/branch_service_group.proto'),
      join(__dirname, 'protos/branch_service.proto'),
    ],
  },
};
