import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { EGrpcClientService } from '../../enums';
import { ICount, IId, IQueryV2 } from '../../interfaces';
import { IBookingServiceGrpc } from '../../interfaces/booking';
import { Booking, BookingPaginationResponse, CreateBookingInput, UpdateBookingInput } from '../../types';

@Injectable()
export class BookingService {
  private bookingServiceGrpc: IBookingServiceGrpc;
  constructor(@Inject(EGrpcClientService.BOOKING_SERVICE) private readonly userServiceClient: ClientGrpcProxy) {}

  onModuleInit() {
    this.bookingServiceGrpc = this.userServiceClient.getService<IBookingServiceGrpc>(
      EGrpcClientService.BOOKING_SERVICE,
    );
  }

  async findById(data: IId): Promise<Booking> {
    const result = await lastValueFrom(this.bookingServiceGrpc.findById(data));
    return result;
  }

  async findAll(query: IQueryV2): Promise<BookingPaginationResponse> {
    const result = await lastValueFrom(this.bookingServiceGrpc.findAll(query));
    return result;
  }

  async findAllByMerchant(query: IQueryV2): Promise<BookingPaginationResponse> {
    const result = await lastValueFrom(this.bookingServiceGrpc.findAll(query));
    return result;
  }

  async create(data: CreateBookingInput): Promise<Booking> {
    const result = await lastValueFrom(this.bookingServiceGrpc.create(data));
    return result;
  }

  async update(data: UpdateBookingInput): Promise<Booking> {
    const result = await lastValueFrom(this.bookingServiceGrpc.update(data));
    return result;
  }

  async destroy(id: IQueryV2): Promise<ICount> {
    const result = await lastValueFrom(this.bookingServiceGrpc.destroy(id));
    return result;
  }
}
