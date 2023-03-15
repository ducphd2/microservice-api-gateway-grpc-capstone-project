import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class BranchDto {
  readonly id?: string;

  @Field()
  readonly name?: string;

  @Field()
  readonly phone?: string;

  @Field()
  readonly address?: string;

  @Field()
  readonly cityCode?: number;

  @Field()
  readonly districtCode?: number;

  @Field()
  readonly wardCode?: number;

  @Field()
  readonly profileId?: number;

  @Field()
  readonly merchantId?: number;

  @Field()
  readonly createdAt?: number;

  @Field()
  readonly updatedAt?: number;
}
