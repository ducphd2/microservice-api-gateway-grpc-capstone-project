import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresqlModule } from './database/postgresql.module';
import { MerchantsModule } from './modules/merchant/merchants.module';
import { MerchantBranchesModule } from './modules/merchant-branch/merchant-branches.module';
import { ImagesModule } from './modules/images/images.module';
import { ProductsModule } from './modules/product/products.module';
import { CategoriesModule } from './modules/category/categories.module';
import { BranchServicesModule } from './modules/branch-service/branch-services.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostgresqlModule,
    MerchantsModule,
    MerchantBranchesModule,
    BranchServicesModule,
    ImagesModule,
    ProductsModule,
    CategoriesModule,
  ],
})
export class AppModule {}
