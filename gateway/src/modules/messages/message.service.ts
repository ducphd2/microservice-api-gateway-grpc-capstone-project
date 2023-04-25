import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Message } from './schemas/messages.schema';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('Message')
    private readonly messageModel: Model<Message>,
  ) {}

  async create(messageData: any): Promise<Message> {
    const createdMessage = new this.messageModel(messageData);
    return await createdMessage.save();
  }

  async getRecentMessages(userId: string, page: number, limit: number): Promise<Message[]> {
    const skip = (page - 1) * limit;
    return this.messageModel
      .find({ $or: [{ senderId: userId }, { receiverId: userId }] })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async getConversationMessages(userId: string, otherUserId: string, page: number, limit: number): Promise<Message[]> {
    const skip = (page - 1) * limit;
    return this.messageModel
      .find({
        $or: [
          { senderId: userId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: userId },
        ],
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }
}
