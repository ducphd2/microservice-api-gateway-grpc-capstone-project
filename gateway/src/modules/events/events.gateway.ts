import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from '../messages/message.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  constructor(private readonly messagesService: MessagesService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createMessage')
  async handleMessage(@MessageBody() messageData: any) {
    const { senderId, receiverId, content, contentType } = messageData;

    const createdMessage = await this.messagesService.create({
      senderId,
      receiverId,
      content,
      contentType
    });

    this.server.to(`${receiverId}`).emit('newMessage', createdMessage);
  }

  @SubscribeMessage('recentMessages')
  async handleRecentMessages(socket: Socket, payload: {userId: string, limit: number, page: number}) {
    const messages = await this.messagesService.getRecentMessages(
      payload.userId,
      payload.limit,
      payload.page,
    );
    this.server.to(socket.id).emit('recentMessages', messages);
  }

  @SubscribeMessage('conversationMessages')
  async handleConversationMessages(socket: Socket, payload: {userId: string, otherUserId: string, limit: number, page: number}) {
    const messages = await this.messagesService.getConversationMessages(
      payload.userId,
      payload.otherUserId,
      payload.limit,
      payload.page,
    );
    this.server.to(socket.id).emit('conversationMessages', messages);
  }

  handleConnection(socket: Socket) {
    console.log(`Client connected: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    console.log(`Client disconnected: ${socket.id}`);
  }
}
