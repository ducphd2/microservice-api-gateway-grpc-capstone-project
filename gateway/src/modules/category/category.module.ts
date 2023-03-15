import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { MerchantCategoryResolver } from './category.resolver';
import { MerchantCategoryService } from './category.service';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MERCHANT_CATEGORY_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50002',
          package: 'merchant_category',
          protoPath: join(__dirname, '../../protos/merchant_category.proto'),
        },
      },
    ]),
    UploadModule,
  ],
  providers: [MerchantCategoryResolver, MerchantCategoryService],
  exports: [MerchantCategoryService],
})
export class MerchantCategoryModule {}
