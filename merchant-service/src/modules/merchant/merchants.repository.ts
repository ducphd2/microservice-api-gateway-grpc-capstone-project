import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/database/base.repository';
import { Merchant } from '../../database/entities/merchant.model';

@Injectable()
export class MerchantsRepository extends BaseRepository<Merchant> {
  constructor(@InjectModel(Merchant) readonly model: typeof Merchant) {
    super(model);
  }
}
