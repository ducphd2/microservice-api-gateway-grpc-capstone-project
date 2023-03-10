import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:50000',
    package: ['merchant'],
    protoPath: [join(__dirname, 'protos/merchant.proto')],
  },
};
