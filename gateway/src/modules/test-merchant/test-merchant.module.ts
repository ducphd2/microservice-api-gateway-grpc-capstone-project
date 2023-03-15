import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TestMerchantResolver } from './test-merchant.resolver';
import { TestMerchantService } from './test-merchant.service';
import { TestMerchantQueryResolver } from './test-merchant-query.resolver';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TEST_MERCHANT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50002',
          package: ['test_merchant'],
          protoPath: [join(__dirname, '../../protos/test_merchant.proto')],
        },
      },
    ]),
  ],
  providers: [TestMerchantResolver, TestMerchantQueryResolver, TestMerchantService],
  exports: [TestMerchantService],
})
export class TestMerchantModule {}
