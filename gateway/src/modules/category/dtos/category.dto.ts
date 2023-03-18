import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { UploadParamInput } from '../../upload/upload-type.dto';
import { GraphQLUpload, Upload } from 'graphql-upload-minimal';

@InputType()
export class CategoryDto {
  readonly id?: string;

  @Field()
  readonly name?: string;

  @Field()
  readonly code?: string;

  @Field(() => String, { nullable: true })
  readonly imageUrl?: string;
}

@ArgsType()
export class UploadInputArgs {
  @Field(() => CategoryDto)
  data!: CategoryDto;

  @Field(() => GraphQLUpload, { nullable: true })
  file?: Promise<Upload>;

  @Field(() => String, { nullable: true })
  folder?: string;
}
