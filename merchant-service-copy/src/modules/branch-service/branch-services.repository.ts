import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/database/base.repository';
import { BranchServices } from '../../database/entities/branch-service.model';

@Injectable()
export class BranchServicesRepository extends BaseRepository<BranchServices> {
  constructor(@InjectModel(BranchServices) readonly model: typeof BranchServices) {
    super(model);
  }
}
