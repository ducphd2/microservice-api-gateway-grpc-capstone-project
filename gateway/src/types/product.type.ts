import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseType } from './base.type';
import { ProductImage } from './product-image.type';

@ObjectType()
export class Product extends BaseType {
  @Field(() => String)
  code: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String, { nullable: true })
  sku: string;

  @Field(() => String, { nullable: true })
  qrCode: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => [ProductImage], { nullable: true })
  images: ProductImage[];
}
