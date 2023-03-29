import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresqlModule } from './database/postgresql.module';
import { MerchantsModule } from './modules/merchants/merchants.module';
import { BranchesModule } from './modules/branches/branches.module';
import { ImagesModule } from './modules/images/images.module';
import { ProductsModule } from './modules/product/products.module';
import { CategoriesModule } from './modules/category/categories.module';
import { BranchServiceGroupsModule } from './modules/service-groups/service-groups.module';
import { ServicesModule } from './modules/services/services.module';
import { BranchServicesModule } from './modules/branch-services/branch-services.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostgresqlModule,
    MerchantsModule,
    BranchesModule,
    ServicesModule,
    ImagesModule,
    ProductsModule,
    CategoriesModule,
    BranchServiceGroupsModule,
    BranchServicesModule,
  ],
})
export class AppModule {}
