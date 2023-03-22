import { GrpcMethod } from '@nestjs/microservices';
import { CreateMerchantBranchInput, UpdateMerchantBranchInput } from '../../interfaces/merchant-branch';
import { MerchantBranchesService } from './merchant-branches.services';
import { ICount, IFindPayload, IId, IQuery } from '../../interfaces';
import { Controller } from '@nestjs/common';
import { EGrpcClientService } from '../../enums';
import { isEmpty, isNil } from 'lodash';
import { MerchantBranch } from '../../database/entities/merchant-branch.model';

import Aigle from 'aigle';

const { map } = Aigle;

@Controller()
export class MerchantBranchesController {
  constructor(private merchantBranchesService: MerchantBranchesService) {}

  @GrpcMethod(EGrpcClientService.MERCHANT_BRANCH_SERVICE, 'find')
  async findAll(query: IQuery) {
    const { results, cursors } = await this.merchantBranchesService.find({
      attributes: !isEmpty(query.select) ? ['id'].concat(query.select) : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
      order: !isEmpty(query.orderBy) ? query.orderBy : undefined,
      limit: !isNil(query.limit) ? query.limit : 25,
      before: !isEmpty(query.before) ? query.before : undefined,
      after: !isEmpty(query.after) ? query.after : undefined,
    });

    const result: IFindPayload<MerchantBranch> = {
      edges: await map(results, async (branch: MerchantBranch) => ({
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
    const { results, cursors } = await this.merchantBranchesService.find({
      attributes: !isEmpty(query.select) ? ['id'].concat(query.select) : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
      order: !isEmpty(query.orderBy) ? query.orderBy : undefined,
      limit: !isNil(query.limit) ? query.limit : 25,
      before: !isEmpty(query.before) ? query.before : undefined,
      after: !isEmpty(query.after) ? query.after : undefined,
    });

    const result: IFindPayload<MerchantBranch> = {
      edges: await map(results, async (branch: MerchantBranch) => ({
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
    const result = await this.merchantBranchesService.createMerchantBranch(data);
    return result;
  }

  @GrpcMethod(EGrpcClientService.MERCHANT_BRANCH_SERVICE, 'findById')
  async findById({ id }: IId) {
    const result = await this.merchantBranchesService.findById(id);
    return result;
  }

  @GrpcMethod(EGrpcClientService.MERCHANT_BRANCH_SERVICE, 'update')
  async updateBranch({ id, data }: UpdateMerchantBranchInput) {
    const result = await this.merchantBranchesService.updateMerchantBranch(id, data);
    return result;
  }

  @GrpcMethod(EGrpcClientService.MERCHANT_BRANCH_SERVICE, 'destroy')
  async deleteBranch({ id }: IId): Promise<ICount> {
    const count = await this.merchantBranchesService.deleteBranch(id);
    return { count };
  }
}
