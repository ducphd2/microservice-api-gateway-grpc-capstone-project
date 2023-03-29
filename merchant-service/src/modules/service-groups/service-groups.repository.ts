import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/database/base.repository';
import { ServiceGroup } from '../../database/entities/service-group.model';
import { IFindAndPaginateOptions, IFindAndPaginateResult } from '../../interfaces';

@Injectable()
export class ServiceGroupRepository extends BaseRepository<ServiceGroup> {
  constructor(@InjectModel(ServiceGroup) readonly model: typeof ServiceGroup) {
    super(model);
  }

  async findServiceGroups(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<ServiceGroup>> {
    // @ts-ignore
    const result: IFindAndPaginateResult<ServiceGroup> = await this.model.findAndPaginate({
      ...query,
      raw: true,
      paranoid: false,
    });

    return result;
  }
}
