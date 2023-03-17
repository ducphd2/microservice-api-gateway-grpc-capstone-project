import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Merchant } from '../../database/entities/merchant.model';
import { MerchantsController } from './merchants.controller';
import { MerchantsRepository } from './merchants.repository';
import { MerchantsService } from './merchants.services';
import { MerchantBranchesModule } from '../merchant-branch/merchant-branches.module';

@Module({
  imports: [SequelizeModule.forFeature([Merchant]), MerchantBranchesModule],
  controllers: [MerchantsController],
  providers: [MerchantsService, MerchantsRepository],
  exports: [MerchantsService],
})
export class MerchantsModule {}
