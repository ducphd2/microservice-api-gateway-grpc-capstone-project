import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BranchService } from '../../database/entities';
import { BranchServicesController } from './branch-services.controller';
import { BranchServicesRepository } from './branch-services.repository';
import { BranchServicesService } from './branch-services.services';

@Module({
  imports: [SequelizeModule.forFeature([BranchService])],
  controllers: [BranchServicesController],
  providers: [BranchServicesService, BranchServicesRepository],
  exports: [BranchServicesService],
})
export class BranchServicesModule {}
