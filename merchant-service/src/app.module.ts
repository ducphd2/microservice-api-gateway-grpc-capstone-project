import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MerchantModule } from './merchant/merchant.module';
import { MerchantBranchModule } from './merchant-branch/merchant-branch.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRoot(),
    MerchantModule,
    MerchantBranchModule,
  ],
})
export class AppModule {}
