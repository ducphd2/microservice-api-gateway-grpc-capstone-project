import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Match } from './inputRegisterRequest.dto';

@InputType()
export class ChangePasswordInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @Field()
  @Match('newPassword')
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
}
