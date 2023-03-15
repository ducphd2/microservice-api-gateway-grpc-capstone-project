import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { MerchantBranchResolver } from './branch.resolver';
import { MerchantBranchService } from './branch.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MERCHANT_BRANCH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50002',
          package: 'merchant_branch',
          protoPath: join(__dirname, '../../protos/merchant_branch.proto'),
        },
      },
    ]),
  ],
  providers: [MerchantBranchResolver, MerchantBranchService],
  exports: [MerchantBranchService],
})
export class MerchantBranchModule {}
