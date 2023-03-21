import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LoggerModule } from 'nestjs-pino';

import { User } from '../../database/models/user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CustomersModule } from '../customers/customers.module';
import { DevicesModule } from '../devices/devices.module';

@Module({
  imports: [LoggerModule, SequelizeModule.forFeature([User]), CustomersModule, DevicesModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
