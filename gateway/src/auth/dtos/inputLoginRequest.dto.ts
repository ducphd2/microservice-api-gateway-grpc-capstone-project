import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { DeviceInputDto } from '../../types';

@InputType()
export class InputLoginRequest {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;

  @Field(() => DeviceInputDto, { nullable: true })
  device: DeviceInputDto;
}
