import { join } from 'path';

import { INestMicroservice } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { RPCExceptionFilter } from './commons/filters';

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: `${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`,
      package: ['booking'],
      protoPath: [join(__dirname, 'protos/booking.proto')],
      loader: {
        keepCase: true,
        enums: String,
        oneofs: true,
        arrays: true,
      },
    },
  });

  app.useGlobalFilters(new RPCExceptionFilter());

  await app.listen();
}
bootstrap();
