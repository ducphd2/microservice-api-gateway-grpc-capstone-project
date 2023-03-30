import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaginationModule } from '@ntheanh201/nestjs-sequelize-pagination';
import { PostgresqlModule } from './database/postgresql.module';
import { BranchServiceGroupsModule } from './modules/branch-service-group/branch-service-groups.module';
import { BranchServicesModule } from './modules/branch-service/branch-services.module';
import { CategoriesModule } from './modules/category/categories.module';
import { ImagesModule } from './modules/images/images.module';
import { MerchantBranchesModule } from './modules/merchant-branch/merchant-branches.module';
import { MerchantsModule } from './modules/merchant/merchants.module';
import { ProductsModule } from './modules/product/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PaginationModule.forRoot({ isGlobal: true }),
    PostgresqlModule,
    MerchantsModule,
    MerchantBranchesModule,
    BranchServicesModule,
    ImagesModule,
    ProductsModule,
    CategoriesModule,
    BranchServiceGroupsModule,
  ],
})
export class AppModule {}
