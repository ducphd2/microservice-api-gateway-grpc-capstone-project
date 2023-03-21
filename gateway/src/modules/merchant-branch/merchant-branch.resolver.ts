import { Resolver } from '@nestjs/graphql';
import { MerchantBranchService } from './merchant-branch.service';

@Resolver()
export class MerchantResolver {
  constructor(private merchantService: MerchantBranchService) {}
}
