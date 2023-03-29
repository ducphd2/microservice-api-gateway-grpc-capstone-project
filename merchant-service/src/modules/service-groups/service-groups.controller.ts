import { GrpcMethod } from '@nestjs/microservices';
import { ICount, IFindPayload, IId, IQuery } from '../../interfaces';
import { ServiceGroupService } from './service-groups.services';
import { ICreateBranchServicesInput, IUpdateBranchServicesInput } from '../../interfaces/services';
import { EGrpcClientService } from '../../enums';
import { Controller } from '@nestjs/common';
import { ServiceGroup } from '../../database/entities/service-group.model';
import { isEmpty, isNil } from 'lodash';
import Aigle from 'aigle';
import { ErrorHelper } from '../../helpers';
const { map } = Aigle;

@Controller()
export class ServiceGroupController {
  constructor(private serviceGroupSvc: ServiceGroupService) {}

  @GrpcMethod(EGrpcClientService.BRANCH_SERVICE_GROUP_SERVICE, 'find')
  async find(query: IQuery): Promise<IFindPayload<ServiceGroup>> {
    const { results, cursors } = await this.serviceGroupSvc.find({
      attributes: !isEmpty(query.select) ? ['id'].concat(query.select) : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
      order: !isEmpty(query.orderBy) ? query.orderBy : undefined,
      limit: !isNil(query.limit) ? query.limit : 25,
      before: !isEmpty(query.before) ? query.before : undefined,
      after: !isEmpty(query.after) ? query.after : undefined,
    });

    const result: IFindPayload<ServiceGroup> = {
      edges: await map(results, async (group: ServiceGroup) => ({
        node: group,
        cursor: Buffer.from(JSON.stringify([group.id])).toString('base64'),
      })),
      pageInfo: {
        startCursor: cursors.before || '',
        endCursor: cursors.after || '',
        hasNextPage: cursors.hasNext || false,
        hasPreviousPage: cursors.hasPrevious || false,
      },
    };

    return result;
  }

  @GrpcMethod(EGrpcClientService.BRANCH_SERVICE_GROUP_SERVICE, 'findAll')
  async findAll() {
    return this.serviceGroupSvc.findAll();
  }

  @GrpcMethod(EGrpcClientService.BRANCH_SERVICE_GROUP_SERVICE, 'create')
  async create(data: ICreateBranchServicesInput) {
    const result = await this.serviceGroupSvc.create(data);
    return result.toJSON();
  }

  @GrpcMethod(EGrpcClientService.BRANCH_SERVICE_GROUP_SERVICE, 'findById')
  async findById({ id }: IId) {
    const result = await this.serviceGroupSvc.findById(id);

    if (isEmpty(result)) {
      ErrorHelper.NotFoundException('Branch service group not found');
    }

    return result;
  }

  @GrpcMethod(EGrpcClientService.BRANCH_SERVICE_GROUP_SERVICE, 'update')
  async update({ id, data }: IUpdateBranchServicesInput) {
    const result = await this.serviceGroupSvc.updateBranchServiceGroup(id, data);
    return result;
  }

  @GrpcMethod(EGrpcClientService.BRANCH_SERVICE_GROUP_SERVICE, 'destroy')
  async deleteBranch({ id }: IId): Promise<ICount> {
    const count = await this.serviceGroupSvc.delete(id);
    return { count };
  }
}
