import { Module } from '@nestjs/common';
import { MerchantController as MerchantBranchController } from './merchant-branch.controller';
import { MerchantBranchService } from './merchant-branch.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MerchantBranch } from '../database/entities';

@Module({
  imports: [MikroOrmModule.forFeature([MerchantBranch])],
  controllers: [MerchantBranchController],
  providers: [MerchantBranchService],
  exports: [MerchantBranchService],
})
export class MerchantBranchModule {}
