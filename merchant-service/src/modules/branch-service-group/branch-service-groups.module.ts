import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BranchServiceGroups } from '../../database/entities/branch-service-group.model';
import { BranchServiceGroupController } from './branch-service-groups.controller';
import { BranchServiceGroupRepository } from './branch-service-groups.repository';
import { BranchServiceGroupService } from './branch-service-groups.services';
import { MerchantBranchesModule } from '../merchant-branch/merchant-branches.module';

@Module({
  imports: [SequelizeModule.forFeature([BranchServiceGroups]), MerchantBranchesModule],
  controllers: [BranchServiceGroupController],
  providers: [BranchServiceGroupService, BranchServiceGroupRepository],
  exports: [BranchServiceGroupService],
})
export class BranchServiceGroupsModule {}
