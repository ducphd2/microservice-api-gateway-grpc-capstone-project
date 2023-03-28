import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsPhoneNumber, IsString, Matches } from 'class-validator';

@InputType()
export class CreateMerchantRequestInputDto {
  @Field()
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @Field()
  @IsPhoneNumber()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @Field()
  @IsPhoneNumber()
  @IsString()
  @IsNotEmpty()
  merchantPhone: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  merchantName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  merchantAddress: string;

  @Field()
  @IsInt()
  @IsNotEmpty()
  cityCode: number;

  @Field()
  @IsInt()
  @IsNotEmpty()
  districtCode: number;

  @Field()
  @IsInt()
  @IsNotEmpty()
  wardCode: number;

  @Field()
  @Matches(/^[a-zA-Z0-9\-]+$/)
  @IsString()
  @IsNotEmpty()
  merchantSubdomain: string;
}
