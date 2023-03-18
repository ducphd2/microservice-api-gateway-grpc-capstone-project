/*
------------------------------------------------------------------------------ 
Author: devhoangkien 
Website: https://devhoangkien.com
------------------------------------------------------------------------------
*/
import { GraphQLUpload, Upload } from 'graphql-upload-minimal';

import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class UploadInputArgs {
  @Field(() => GraphQLUpload)
  file!: Promise<Upload>;

  @Field(() => String, { nullable: true })
  @IsString()
  folder?: string;
}

@ArgsType()
export class UploadMultipleInputArgs {
  @Field(() => String, { nullable: true })
  @IsString()
  folder?: string;

  @Field(() => [GraphQLUpload])
  files!: Promise<[Upload]>;
}
