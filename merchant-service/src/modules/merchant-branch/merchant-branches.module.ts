import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MerchantBranch } from '../../database/entities/merchant-branch.model';
import { MerchantBranchesController } from './merchant-branches.controller';
import { MerchantBranchesRepository } from './merchant-branches.repository';
import { MerchantBranchesService } from './merchant-branches.services';

@Module({
  imports: [SequelizeModule.forFeature([MerchantBranch])],
  controllers: [MerchantBranchesController],
  providers: [MerchantBranchesService, MerchantBranchesRepository],
  exports: [MerchantBranchesService],
})
export class MerchantBranchesModule {}
