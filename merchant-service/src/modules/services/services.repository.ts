import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/database/base.repository';
import { Service } from '../../database/entities/service.model';
import { IFindAndPaginateOptions, IFindAndPaginateResult } from '../../interfaces';

@Injectable()
export class ServiceRepository extends BaseRepository<Service> {
  constructor(@InjectModel(Service) readonly model: typeof Service) {
    super(model);
  }

  async findServiceGroups(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<Service>> {
    // @ts-ignore
    const result: IFindAndPaginateResult<Service> = await this.model.findAndPaginate({
      ...query,
      raw: true,
      paranoid: false,
    });

    return result;
  }
}
