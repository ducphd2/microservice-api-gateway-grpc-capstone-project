import { Inject, Logger, OnModuleInit, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ClientGrpcProxy, RpcException } from '@nestjs/microservices';
import { isNil } from 'lodash';
import { lastValueFrom } from 'rxjs';
import { CurrentUser } from '../../common/decorators';
import { EBookingStatus } from '../../enums';
import { EGrpcClientService } from '../../enums/grpc-services.enum';
import { GqlAuthGuard } from '../../guard';
import { IBookingServiceGrpc } from '../../interfaces/booking';
import {
  Booking,
  BookingPayload,
  CreateBookingInput,
  CustomerCreateBookingInput,
  DeleteBookingPayload,
  PartialUpdateBooking,
  User,
} from '../../types';
import { BranchServicesService } from '../branch-service/branch-service.service';
import { CustomerService } from '../customer/customer.service';
import { MerchantService } from '../merchant/merchant.service';
import { UserService } from '../user/user.service';

@Resolver()
export class BookingMutationResolver implements OnModuleInit {
  private bookingService: IBookingServiceGrpc;
  private logger = new Logger(this.constructor.name);

  constructor(
    @Inject(EGrpcClientService.BOOKING_SERVICE)
    private readonly bookingsServiceClient: ClientGrpcProxy,
    private readonly branchServiceSvc: BranchServicesService,
    private readonly userSvc: UserService,
    private readonly merchantSvc: MerchantService,
    private readonly customerSvc: CustomerService,
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
  async customerCreateBooking(
    @CurrentUser() user: User,
    @Args('data') bookingInput: CustomerCreateBookingInput,
  ): Promise<BookingPayload> {
    try {
      const customer = await this.customerSvc.findByUserId({
        id: user.id,
      });

      if (isNil(customer)) {
        this.logger.error(`Customer is not found, ${JSON.stringify(bookingInput)}`);
        throw new Error('Customer is not found');
      }

      const branchService = await this.branchServiceSvc.findById({
        id: bookingInput.branchServiceId,
      });

      if (isNil(branchService)) {
        this.logger.error(`Branch service is not found, ${JSON.stringify(bookingInput)}`);
        throw new Error('Branch service is not found');
      }

      const merchant = await this.merchantSvc.findById({
        id: branchService.merchantId,
      });

      if (isNil(merchant)) {
        this.logger.error(`Merchant when create booking is not found, ${JSON.stringify(bookingInput)}`);
        throw new Error('Merchant when create booking is not found');
      }

      const adminOwner = await this.userSvc.findById({
        id: merchant.userId,
      });

      if (isNil(adminOwner)) {
        this.logger.error(`Owner admin when create booking is not found, ${JSON.stringify(bookingInput)}`);
        throw new Error('Owner admin is not found');
      }

      const booking: Booking = await lastValueFrom(
        this.bookingService.customerCreate({
          ...bookingInput,
          customerId: customer.id,
          customerEmail: user.email,
          adminBranchEmail: adminOwner.email,
          customerName: user.fullName,
          status: EBookingStatus.PENDING,
        }),
      );

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
