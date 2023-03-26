import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresqlModule } from './database/postgresql.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { BookingProductsModule } from './modules/booking-products/booking-products.module';
import { IoRedisModule } from './modules/redis/redis.module';
import { BullQueueModule } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostgresqlModule,
    BookingsModule,
    BookingProductsModule,
    IoRedisModule,
    BullQueueModule,
  ],
})
export class AppModule {}
