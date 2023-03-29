import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { isEmpty, isNil } from 'lodash';
import { EGrpcClientService } from '../../enums';
import { ICount, IFindPayload, IId, IQuery } from '../../interfaces';
import { BranchServicesService } from './branch-services.services';

import Aigle from 'aigle';
import { BranchService } from '../../database/entities';
import { CreateBranchServiceInput, UpdateBranchServiceInput } from '../../interfaces/branch-services';

const { map } = Aigle;

@Controller()
export class BranchServicesController {
  constructor(private branchesServicesSvc: BranchServicesService) {}

  @GrpcMethod(EGrpcClientService.BRANCH_SERVICE, 'find')
  async findAll(query: IQuery) {
    const { results, cursors } = await this.branchesServicesSvc.find({
      attributes: !isEmpty(query.select) ? ['id'].concat(query.select) : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
      order: !isEmpty(query.orderBy) ? query.orderBy : undefined,
      limit: !isNil(query.limit) ? query.limit : 25,
      before: !isEmpty(query.before) ? query.before : undefined,
      after: !isEmpty(query.after) ? query.after : undefined,
    });

    const result: IFindPayload<BranchService> = {
      edges: await map(results, async (branch: BranchService) => ({
        node: branch,
        cursor: Buffer.from(JSON.stringify([branch.id])).toString('base64'),
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

  @GrpcMethod(EGrpcClientService.BRANCH_SERVICE, 'findByUserId')
  async findByUserId(query: IQuery) {
    const { results, cursors } = await this.branchesServicesSvc.find({
      attributes: !isEmpty(query.select) ? ['id'].concat(query.select) : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
      order: !isEmpty(query.orderBy) ? query.orderBy : undefined,
      limit: !isNil(query.limit) ? query.limit : 25,
      before: !isEmpty(query.before) ? query.before : undefined,
      after: !isEmpty(query.after) ? query.after : undefined,
    });

    const result: IFindPayload<BranchService> = {
      edges: await map(results, async (branch: BranchService) => ({
        node: branch,
        cursor: Buffer.from(JSON.stringify([branch.id])).toString('base64'),
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

  @GrpcMethod(EGrpcClientService.BRANCH_SERVICE, 'create')
  async create(data: CreateBranchServiceInput) {
    const result = await this.branchesServicesSvc.create(data);
    return result;
  }

  @GrpcMethod(EGrpcClientService.BRANCH_SERVICE, 'findById')
  async findById({ id }: IId) {
    const result = await this.branchesServicesSvc.findById(id);
    return result;
  }

  @GrpcMethod(EGrpcClientService.BRANCH_SERVICE, 'update')
  async update({ id, data }: UpdateBranchServiceInput) {
    const result = await this.branchesServicesSvc.update(id, data);
    return result;
  }

  @GrpcMethod(EGrpcClientService.BRANCH_SERVICE, 'destroy')
  async delete({ id }: IId): Promise<ICount> {
    const count = await this.branchesServicesSvc.delete(id);
    return { count };
  }
}
