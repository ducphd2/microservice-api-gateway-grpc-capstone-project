import { Module } from '@nestjs/common';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Merchant } from '../entities/cv.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Merchant])],
  controllers: [MerchantController],
  providers: [MerchantService],
})
export class MerchantModule {}
