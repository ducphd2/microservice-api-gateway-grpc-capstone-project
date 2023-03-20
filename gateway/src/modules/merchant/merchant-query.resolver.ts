import { Args, Query, Resolver } from '@nestjs/graphql';
import { MerchantService } from './merchant.service';
import { Merchant, User } from '../../types';
import { UseGuards } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { GqlAuthGuard } from '../../guard';

@Resolver()
export class MerchantQueryResolver {
  constructor(private testMerchantService: MerchantService) {}

  @Query(() => Merchant)
  @UseGuards(GqlAuthGuard)
  async findOneMerchant(@Args('id') id: number): Promise<Merchant> {
    try {
      const result = await this.testMerchantService.findMerchantById({ id });
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
