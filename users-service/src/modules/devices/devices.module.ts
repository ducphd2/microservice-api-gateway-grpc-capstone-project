import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { SequelizeModule } from '@nestjs/sequelize';
import { Device } from '../../database/models';
import { DevicesService } from './devices.service';

@Module({
  imports: [LoggerModule, SequelizeModule.forFeature([Device])],
  providers: [DevicesService],
  exports: [DevicesService],
})
export class DevicesModule {}
