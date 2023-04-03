import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Booking } from '../../database/models';
import { EBullQueue } from '../../enums';
import { UserGrpcModule } from '../user-grpc/user-grpc.module';

import { BookingsController } from './bookings.controller';
import { BookingsRepository } from './bookings.repository';
import { BookingsService } from './bookings.service';
import { BookingQueueProvider } from './bull-producer.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Booking]),
    BullModule.registerQueue({
      name: EBullQueue.BOOKING_QUEUE,
    }),
    UserGrpcModule,
  ],
  providers: [BookingsService, BookingsRepository, BookingQueueProvider],
  controllers: [BookingsController],
  exports: [BookingsService],
})
export class BookingsModule {}
