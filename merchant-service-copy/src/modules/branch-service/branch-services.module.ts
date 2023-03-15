import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BranchServices } from '../../database/entities/branch-service.model';
import { BranchServicesController } from './branch-services.controller';
import { BranchServicesRepository } from './branch-services.repository';
import { BranchServicesService } from './branch-services.services';

@Module({
  imports: [SequelizeModule.forFeature([BranchServices])],
  controllers: [BranchServicesController],
  providers: [BranchServicesService, BranchServicesRepository],
  exports: [BranchServicesService],
})
export class BranchServicesModule {}
