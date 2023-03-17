import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { SequelizeModule } from '@nestjs/sequelize';

import { Customer } from './customers.model';
import { UsersController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  imports: [LoggerModule, SequelizeModule.forFeature([Customer])],
  providers: [{ provide: 'CustomersService', useClass: CustomersService }],
  controllers: [UsersController],
})
export class CustomersModule {}
