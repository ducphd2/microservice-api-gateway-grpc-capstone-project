import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LoggerModule } from 'nestjs-pino';

import { User } from '../database/models/user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CustomersModule } from '../customer/customers.module';

@Module({
  imports: [LoggerModule, SequelizeModule.forFeature([User]), CustomersModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
