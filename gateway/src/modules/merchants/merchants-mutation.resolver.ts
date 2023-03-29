import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MerchantService } from './merchants.service';
import { QueryUtils } from '../../utils/query.utils';
import { Merchant } from '../../types';
import { GqlAuthGuard } from '../../guard';
import { UseGuards } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

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
