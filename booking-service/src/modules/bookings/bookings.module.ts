import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BullModule } from '@nestjs/bull';

import { Booking } from '../../database/models';
import { EBullQueue } from '../../enums';

import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { BookingsRepository } from './bookings.repository';
import { BookingQueueProvider } from './bull-producer.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Booking]),
    BullModule.registerQueue({
      name: EBullQueue.BOOKING_QUEUE,
    }),
  ],
  providers: [BookingsService, BookingsRepository, BookingQueueProvider],
  controllers: [BookingsController],
  exports: [BookingsService],
})
export class BookingsModule {}
