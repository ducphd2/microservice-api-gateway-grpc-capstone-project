import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BranchServicesController } from './branch-services.controller';
import { BranchServiceRepository } from './branch-services.repository';
import { BranchServicesService } from './branch-services.services';
import { BranchServices } from '../../database/entities';
import { MerchantBranchesModule } from '../merchant-branch/merchant-branches.module';
import { BranchServiceGroupsModule } from '../branch-service-group/branch-service-groups.module';

@Module({
  imports: [SequelizeModule.forFeature([BranchServices]), MerchantBranchesModule, BranchServiceGroupsModule],
  controllers: [BranchServicesController],
  providers: [BranchServicesService, BranchServiceRepository],
  exports: [BranchServicesService],
})
export class BranchServicesModule {}
