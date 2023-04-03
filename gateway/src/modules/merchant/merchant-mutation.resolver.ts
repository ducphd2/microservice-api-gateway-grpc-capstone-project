import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RpcException } from '@nestjs/microservices';
import { GqlAuthGuard } from '../../guard';
import { Merchant } from '../../types';
import { QueryUtils } from '../../utils/query.utils';
import { MerchantService } from './merchant.service';

@Resolver()
export class MerchantMutationResolver {
  constructor(private merchantService: MerchantService, private readonly queryUtils: QueryUtils) {}

  @Mutation(() => Merchant)
  @UseGuards(GqlAuthGuard)
  async findMerchantById(@Args('id') id: number): Promise<Merchant> {
    try {
      const result = await this.merchantService.findById({ id });
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
