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
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @MaxLength(30)
  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field()
  @Match('password')
  @IsNotEmpty()
  confirmPassword: string;

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
  merchantSubdomain: string;
}
