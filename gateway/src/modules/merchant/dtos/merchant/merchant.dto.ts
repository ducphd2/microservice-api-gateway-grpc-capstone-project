import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsPhoneNumber, IsString, Min, Matches } from 'class-validator';
import { GraphQLUpload, Upload } from 'graphql-upload-minimal';

@InputType()
export class MerchantDto {
  readonly id?: number;

  @Field()
  @IsInt()
  @IsNotEmpty()
  readonly profileId: number;

  @Field()
  @IsPhoneNumber()
  @IsString()
  readonly phone?: string;

  @Field()
  @IsString()
  readonly name?: string;

  @Field()
  @IsString()
  readonly address?: string;

  @Field()
  @IsInt()
  readonly cityCode?: number;

  @Field()
  @IsInt()
  readonly districtCode?: number;

  @Field()
  @IsInt()
  readonly wardCode?: number;

  @Field()
  @Matches(/^[a-zA-Z0-9\-]+$/)
  @IsString()
  readonly subdomain?: string;
}
