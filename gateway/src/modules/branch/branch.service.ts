import { Inject, Injectable } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { MerchantBranch } from '../../types';
import { BranchDto } from './dtos';
import {
  DeleteBranchPayload,
  FindAllBranches,
  MerchantBranchServiceGrpc,
} from './interfaces/merchant-branch-service-grpc';

@Injectable()
export class MerchantBranchService {
  private merchantBranchServiceGrpc: MerchantBranchServiceGrpc;

  constructor(@Inject('MERCHANT_BRANCH_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.merchantBranchServiceGrpc = this.client.getService<MerchantBranchServiceGrpc>('MerchantBranchServiceGrpc');
  }

  async create(registerInput: BranchDto): Promise<MerchantBranch> {
    const branch = await lastValueFrom(this.merchantBranchServiceGrpc.create(registerInput));
    return branch;
  }

  async find(): Promise<FindAllBranches> {
    const branches = await lastValueFrom(this.merchantBranchServiceGrpc.find({ limit: 10 }));
    return branches;
  }

  async findById(@Args('id') id: number): Promise<MerchantBranch> {
    const branch = await lastValueFrom(this.merchantBranchServiceGrpc.findById({ id }));
    return branch;
  }

  async update(id: number, data: BranchDto): Promise<MerchantBranch> {
    const branch = await lastValueFrom(this.merchantBranchServiceGrpc.update({ id, data }));
    return branch;
  }

  async delete(@Args('id') id: number): Promise<DeleteBranchPayload> {
    const count = await lastValueFrom(this.merchantBranchServiceGrpc.delete({ id }));
    return count;
  }
}
