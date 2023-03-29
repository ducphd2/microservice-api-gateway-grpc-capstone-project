import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServiceGroup } from '../../database/entities/service-group.model';
import { ServiceGroupController } from './service-groups.controller';
import { ServiceGroupRepository } from './service-groups.repository';
import { ServiceGroupService } from './service-groups.services';

@Module({
  imports: [SequelizeModule.forFeature([ServiceGroup])],
  controllers: [ServiceGroupController],
  providers: [ServiceGroupService, ServiceGroupRepository],
  exports: [ServiceGroupService],
})
export class BranchServiceGroupsModule {}
