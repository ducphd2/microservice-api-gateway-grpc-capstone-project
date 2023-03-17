import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { CreateMerchantRequestInputDto } from './create-merchant.dto';
import { MerchantDto } from './merchant.dto';

@InputType()
export class UpdateMerchantRequestInputDto {
  @Field()
  data: MerchantDto;
}
