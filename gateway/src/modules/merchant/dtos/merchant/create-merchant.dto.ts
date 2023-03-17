import { Field, InputType } from '@nestjs/graphql';
import {
  Min,
  IsInt,
  IsNotEmpty,
  IsEmail,
  MaxLength,
  MinLength,
  IsString,
  IsPhoneNumber,
  Matches,
} from 'class-validator';
import { Match } from '../inputRegisterRequest.dto';

@InputType()
export class CreateMerchantRequestInputDto {
  @Field()
  @Min(0)
  @IsInt()
  @IsNotEmpty()
  profileId: number;

  @Field()
  @IsPhoneNumber()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  address: string;

  @Field()
  @Min(0)
  @IsInt()
  @IsNotEmpty()
  cityCode: number;

  @Field()
  @Min(0)
  @IsInt()
  @IsNotEmpty()
  districtCode: number;

  @Field()
  @Min(0)
  @IsInt()
  @IsNotEmpty()
  wardCode: number;

  @Field()
  @Matches(/^[a-zA-Z0-9\-]+$/)
  @IsString()
  @IsNotEmpty()
  subdomain: string;
}
