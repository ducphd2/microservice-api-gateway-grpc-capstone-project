import { Args, Query, Resolver } from '@nestjs/graphql';
import { TestMerchantService } from './test-merchant.service';
import { Merchant, User } from '../../types';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guard/auth.guard';
import { RpcException } from '@nestjs/microservices';

@Resolver()
export class TestMerchantQueryResolver {
  constructor(private testMerchantService: TestMerchantService) {}

  @Query(() => Merchant)
  @UseGuards(AuthGuard)
  async findOneMerchant(@Args('id') id: number): Promise<Merchant> {
    try {
      const result = await this.testMerchantService.findMerchantById({ id });
      return result;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
