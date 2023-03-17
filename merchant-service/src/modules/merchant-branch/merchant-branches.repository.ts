import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/database/base.repository';

import { MerchantBranch } from '../../database/entities/merchant-branch.model';

@Injectable()
export class MerchantBranchesRepository extends BaseRepository<MerchantBranch> {
  constructor(@InjectModel(MerchantBranch) readonly model: typeof MerchantBranch) {
    super(model);
  }
}
