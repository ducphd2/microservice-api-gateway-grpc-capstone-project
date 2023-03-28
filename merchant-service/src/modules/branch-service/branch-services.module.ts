import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BranchServicesController } from './branch-services.controller';
import { BranchServiceRepository } from './branch-services.repository';
import { BranchServicesService } from './branch-services.services';
import { BranchServices } from '../../database/entities';

@Module({
  imports: [SequelizeModule.forFeature([BranchServices])],
  controllers: [BranchServicesController],
  providers: [BranchServicesService, BranchServiceRepository],
  exports: [BranchServicesService],
})
export class BranchServicesModule {}
