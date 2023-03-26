import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from '../../database/base.repository';
import { BookingProduct } from '../../database/models';

@Injectable()
export class BookingProductsRepository extends BaseRepository<BookingProduct> {
  constructor(@InjectModel(BookingProduct) readonly model: typeof BookingProduct) {
    super(model);
  }
}
