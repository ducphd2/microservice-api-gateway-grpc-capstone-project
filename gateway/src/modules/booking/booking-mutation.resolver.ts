import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ClientGrpcProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { EGrpcClientService } from '../../enums/grpc-services.enum';
import { GqlAuthGuard } from '../../guard';
import { IBookingServiceGrpc } from '../../interfaces/booking';
import { Booking, BookingPayload, CreateBookingInput, DeleteBookingPayload, PartialUpdateBooking } from '../../types';

@Resolver()
export class BookingMutationResolver implements OnModuleInit {
  private bookingService: IBookingServiceGrpc;

  constructor(
    @Inject(EGrpcClientService.BOOKING_SERVICE)
    private readonly bookingsServiceClient: ClientGrpcProxy,
  ) {}

  onModuleInit(): void {
    this.bookingService = this.bookingsServiceClient.getService<IBookingServiceGrpc>(
      EGrpcClientService.BOOKING_SERVICE,
    );
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => BookingPayload)
  async createBooking(@Args('data') bookingInput: CreateBookingInput): Promise<BookingPayload> {
    try {
      const booking: Booking = await lastValueFrom(this.bookingService.create(bookingInput));

      return { booking };
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => BookingPayload)
  async updateBooking(@Args('id') id: number, @Args('data') data: PartialUpdateBooking): Promise<BookingPayload> {
    const booking: Booking = await lastValueFrom(this.bookingService.update({ id, data }));

    return { booking };
  }

  @Mutation(() => DeleteBookingPayload)
  @UseGuards(GqlAuthGuard)
  async deleteBooking(@Args('id') id: number): Promise<DeleteBookingPayload> {
    return await lastValueFrom(
      this.bookingService.destroy({
        where: JSON.stringify({
          id: id,
        }),
      }),
    );
  }
}
