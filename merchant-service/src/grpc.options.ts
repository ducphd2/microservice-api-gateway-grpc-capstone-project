import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:50002',
    package: ['merchant', 'test_merchant', 'merchant_branch', 'merchant_category'],
    protoPath: [
      join(__dirname, 'protos/merchant.proto'),
      join(__dirname, 'protos/test_merchant.proto'),
      join(__dirname, 'protos/merchant_branch.proto'),
      join(__dirname, 'protos/merchant_category.proto'),
    ],
  },
};
