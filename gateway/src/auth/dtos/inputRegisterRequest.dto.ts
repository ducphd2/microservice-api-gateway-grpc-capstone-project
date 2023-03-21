import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Match } from '../../common/validators';
import { EDeviceOs } from '../../enums';
import { CreateUserInputDto } from '../../types';

@InputType()
export class InputRegisterRequest extends CreateUserInputDto {
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

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  deviceId: string;

  @Field(() => EDeviceOs, { nullable: true })
  @IsEnum(EDeviceOs)
  @IsOptional()
  os: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  token: string;
}
