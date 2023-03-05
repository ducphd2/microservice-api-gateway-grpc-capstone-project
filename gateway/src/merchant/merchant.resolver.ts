import { Resolver } from '@nestjs/graphql';
import { MerchantService } from './merchant.service';

@Resolver()
export class MerchantResolver {
  constructor(private merchantService: MerchantService) {}
}
