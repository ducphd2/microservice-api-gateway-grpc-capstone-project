import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LoggerModule } from 'nestjs-pino';

import { Customer } from '../../database/models';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [LoggerModule, SequelizeModule.forFeature([Customer]), UsersModule],
  providers: [CustomersService],
  controllers: [CustomersController],
  exports: [CustomersService],
})
export class CustomersModule {}
