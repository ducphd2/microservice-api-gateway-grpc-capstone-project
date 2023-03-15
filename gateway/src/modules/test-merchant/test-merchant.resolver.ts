import { Resolver } from '@nestjs/graphql';
import { TestMerchantService } from './test-merchant.service';

@Resolver()
export class TestMerchantResolver {
  constructor(private merchantService: TestMerchantService) {}
}
