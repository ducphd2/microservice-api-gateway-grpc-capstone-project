import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { BookingProduct } from '../../database/models';
import { BookingProductsController } from './booking-products.controller';
import { BookingProductsService } from './booking-products.service';
import { BookingProductsRepository } from './booking-products.repository';

@Module({
  imports: [SequelizeModule.forFeature([BookingProduct])],
  providers: [BookingProductsService, BookingProductsRepository],
  controllers: [BookingProductsController],
  exports: [BookingProductsService],
})
export class BookingProductsModule {}
