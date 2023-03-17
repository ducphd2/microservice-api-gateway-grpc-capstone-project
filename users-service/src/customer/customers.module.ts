import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { SequelizeModule } from '@nestjs/sequelize';

import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { Customer } from '../database/models';

@Module({
  imports: [LoggerModule, SequelizeModule.forFeature([Customer])],
  providers: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}
