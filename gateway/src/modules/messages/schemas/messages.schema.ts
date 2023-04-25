import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Message {
  @Prop()
  sender_id: string;

  @Prop()
  receiver_id: string;

  @Prop()
  sender_name: string;

  @Prop()
  receiver_name: string;

  @Prop()
  sender_avatar: string;

  @Prop()
  receiver_avatar: string;

  @Prop()
  content: string;

  @Prop()
  type: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
