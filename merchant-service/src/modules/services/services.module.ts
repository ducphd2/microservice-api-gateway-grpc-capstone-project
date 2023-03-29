import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Service } from '../../database/entities';
import { BranchServicesModule } from '../branch-services/branch-services.module';
import { BranchServicesController } from './services.controller';
import { ServiceRepository } from './services.repository';
import { ServicesService } from './services.services';

@Module({
  imports: [SequelizeModule.forFeature([Service]), BranchServicesModule],
  controllers: [BranchServicesController],
  providers: [ServicesService, ServiceRepository],
  exports: [ServicesService],
})
export class ServicesModule {}
