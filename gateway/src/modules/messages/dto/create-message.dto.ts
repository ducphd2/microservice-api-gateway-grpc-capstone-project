import { IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

enum MESSAGE_TYPE{
  TEXT="TEXT",
  IMAGE="IMAGE",
  VIDEO="VIDEO",
}
export class CreateMessageDto {
  @IsNotEmpty()
  @IsMongoId()
  sender_id: string;

  @IsNotEmpty()
  @IsMongoId()
  receiver_id: string;

  @IsNotEmpty()
  @IsString()
  sender_name: string;

  @IsNotEmpty()
  @IsString()
  receiver_name: string;

  @IsNotEmpty()
  @IsString()
  sender_avatar: string;

  @IsNotEmpty()
  @IsString()
  receiver_avatar: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsEnum(MESSAGE_TYPE)
  type: string;
}
