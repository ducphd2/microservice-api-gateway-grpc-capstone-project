import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Booking } from '../../database/models';
import { BaseRepository } from '../../database/base.repository';

@Injectable()
export class BookingsRepository extends BaseRepository<Booking> {
  constructor(@InjectModel(Booking) readonly model: typeof Booking) {
    super(model);
  }
}
