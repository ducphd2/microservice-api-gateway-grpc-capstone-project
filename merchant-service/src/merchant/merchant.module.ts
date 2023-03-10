import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Merchant } from '../database/entities';
import { MerchantBranchModule } from '../merchant-branch/merchant-branch.module';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';

@Module({
  imports: [MikroOrmModule.forFeature([Merchant]), MerchantBranchModule],
  controllers: [MerchantController],
  providers: [MerchantService],
})
export class MerchantModule {}
