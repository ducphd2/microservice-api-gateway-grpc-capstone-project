import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import Aigle from 'aigle';
import { isEmpty, isNil } from 'lodash';
import { BranchServiceGroups } from '../../database/entities/branch-service-group.model';
import { EGrpcClientService } from '../../enums';
import { ErrorHelper } from '../../helpers';
import { ICount, IFindPayload, IId, IQuery } from '../../interfaces';
import { ICreateBranchServicesInput, IUpdateBranchServicesInput } from '../../interfaces/branch-service';
import { BranchServiceGroupService } from '../branch-service-group/branch-service-groups.services';
const { map } = Aigle;

@Controller()
export class BranchServiceGroupController {
  constructor(private branchServicesService: BranchServiceGroupService) {}

  @GrpcMethod(EGrpcClientService.BRANCH_SERVICE_GROUP_SERVICE, 'find')
  async find(query: IQuery): Promise<IFindPayload<BranchServiceGroups>> {
    const { results, cursors } = await this.branchServicesService.find({
      attributes: !isEmpty(query.select) ? ['id'].concat(query.select) : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
      order: !isEmpty(query.orderBy) ? query.orderBy : undefined,
      limit: !isNil(query.limit) ? query.limit : 25,
      before: !isEmpty(query.before) ? query.before : undefined,
      after: !isEmpty(query.after) ? query.after : undefined,
    });

    const result: IFindPayload<BranchServiceGroups> = {
      edges: await map(results, async (group: BranchServiceGroups) => ({
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
    return this.branchServicesService.findAll();
  }

  @GrpcMethod(EGrpcClientService.BRANCH_SERVICE_GROUP_SERVICE, 'create')
  async create(data: ICreateBranchServicesInput) {
    const result = await this.branchServicesService.create(data);
    return result.toJSON();
  }

  @GrpcMethod(EGrpcClientService.BRANCH_SERVICE_GROUP_SERVICE, 'findById')
  async findById({ id }: IId) {
    const result = await this.branchServicesService.findById(id);

    if (isEmpty(result)) {
      ErrorHelper.NotFoundException('Branch service group not found');
    }

    return result;
  }

  @GrpcMethod(EGrpcClientService.BRANCH_SERVICE_GROUP_SERVICE, 'update')
  async updateBranch({ id, data }: IUpdateBranchServicesInput) {
    const result = await this.branchServicesService.updateBranchServiceGroup(id, data);
    return result;
  }

  @GrpcMethod(EGrpcClientService.BRANCH_SERVICE_GROUP_SERVICE, 'destroy')
  async deleteBranch({ id }: IId): Promise<ICount> {
    const count = await this.branchServicesService.delete(id);
    return { count };
  }
}
