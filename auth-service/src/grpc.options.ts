import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:50001',
    package: 'user',
    protoPath: [
      join(__dirname, 'common/proto/user.proto'),
      join(__dirname, 'common/proto/merchant.proto'),
    ],
  },
};
