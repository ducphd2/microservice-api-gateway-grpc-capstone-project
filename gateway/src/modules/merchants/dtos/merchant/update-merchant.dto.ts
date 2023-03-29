import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { CreateMerchantRequestInputDto } from './create-merchant.dto';

@InputType()
export class UpdateMerchantRequestInputDto {
  @Field()
  @IsInt()
  @IsNotEmpty()
  merchantId: number;

  data: Partial<CreateMerchantRequestInputDto>;
}
