import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PinoLogger } from 'nestjs-pino';

import { IFindAndPaginateOptions, IFindAndPaginateResult } from '../../commons/find-and-paginate.interface';

import { Sequelize } from 'sequelize-typescript';
import { Device } from '../../database/models';
import { IDeviceDto } from './dto';
import { Transaction } from 'sequelize';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device) private readonly repo: typeof Device,
    private readonly logger: PinoLogger,
    private readonly sequelize: Sequelize,
  ) {
    logger.setContext(DevicesService.name);
  }

  async find(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<Device>> {
    this.logger.info('DevicesService#findAll.call %o', query);

    // @ts-ignore
    const result: IFindAndPaginateResult<Device> = await this.repo.findAndPaginate({
      ...query,
      raw: true,
      paranoid: false,
    });

    this.logger.info('DevicesService#findAll.result %o', result);

    return result;
  }

  async create(deviceInput: IDeviceDto, transaction?: Transaction): Promise<Device> {
    this.logger.info('DevicesService#create.call %o', deviceInput);

    const dev: Device = await this.repo.create(deviceInput, { transaction });

    this.logger.info('DevicesService#create.result %o', dev);

    return dev;
  }
}
