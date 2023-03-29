import { GrpcMethod } from '@nestjs/microservices';
import { CreateMerchantBranchInput, UpdateMerchantBranchInput } from '../../interfaces/merchant-branch';
import { BranchesService } from './branches.services';
import { ICount, IFindPayload, IId, IQuery } from '../../interfaces';
import { Controller } from '@nestjs/common';
import { EGrpcClientService } from '../../enums';
import { isEmpty, isNil } from 'lodash';
import { Branch } from '../../database/entities/merchant-branch.model';

import Aigle from 'aigle';

const { map } = Aigle;

@Controller()
export class BranchesController {
  constructor(private branchesService: BranchesService) {}

  @GrpcMethod(EGrpcClientService.MERCHANT_BRANCH_SERVICE, 'find')
  async findAll(query: IQuery) {
    const { results, cursors } = await this.branchesService.find({
      attributes: !isEmpty(query.select) ? ['id'].concat(query.select) : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
      order: !isEmpty(query.orderBy) ? query.orderBy : undefined,
      limit: !isNil(query.limit) ? query.limit : 25,
      before: !isEmpty(query.before) ? query.before : undefined,
      after: !isEmpty(query.after) ? query.after : undefined,
    });

    const result: IFindPayload<Branch> = {
      edges: await map(results, async (branch: Branch) => ({
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

  @GrpcMethod(EGrpcClientService.MERCHANT_BRANCH_SERVICE, 'findByUserId')
  async findByUserId(query: IQuery) {
    const { results, cursors } = await this.branchesService.find({
      attributes: !isEmpty(query.select) ? ['id'].concat(query.select) : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
      order: !isEmpty(query.orderBy) ? query.orderBy : undefined,
      limit: !isNil(query.limit) ? query.limit : 25,
      before: !isEmpty(query.before) ? query.before : undefined,
      after: !isEmpty(query.after) ? query.after : undefined,
    });

    const result: IFindPayload<Branch> = {
      edges: await map(results, async (branch: Branch) => ({
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

  @GrpcMethod(EGrpcClientService.MERCHANT_BRANCH_SERVICE, 'create')
  async create(data: CreateMerchantBranchInput) {
    const result = await this.branchesService.createMerchantBranch(data);
    return result;
  }

  @GrpcMethod(EGrpcClientService.MERCHANT_BRANCH_SERVICE, 'findById')
  async findById({ id }: IId) {
    const result = await this.branchesService.findById(id);
    return result;
  }

  @GrpcMethod(EGrpcClientService.MERCHANT_BRANCH_SERVICE, 'update')
  async updateBranch({ id, data }: UpdateMerchantBranchInput) {
    const result = await this.branchesService.updateMerchantBranch(id, data);
    return result;
  }

  @GrpcMethod(EGrpcClientService.MERCHANT_BRANCH_SERVICE, 'destroy')
  async deleteBranch({ id }: IId): Promise<ICount> {
    const count = await this.branchesService.deleteBranch(id);
    return { count };
  }
}
