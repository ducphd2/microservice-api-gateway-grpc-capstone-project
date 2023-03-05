import { MikroORM } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Merchant } from '../entities/cv.entity';

@Injectable()
export class MerchantService {
  constructor(
    private readonly orm: MikroORM,
    @InjectRepository(Merchant)
    private readonly merchantRepository: EntityRepository<Merchant>,
  ) {}

  async findCvById(cvId: number) {
    return await this.merchantRepository.findOne(cvId);
  }
}
