import { Inject, Logger, OnModuleInit, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClientGrpcProxy, RpcException } from '@nestjs/microservices';
import { isEmpty, isNil } from 'lodash';
import { lastValueFrom } from 'rxjs';
import { CurrentUser } from '../../common/decorators';
import { EBookingStatus } from '../../enums';
import { EGrpcClientService } from '../../enums/grpc-services.enum';
import { GqlAuthGuard } from '../../guard';
import { IBookingServiceGrpc } from '../../interfaces/booking';
import {
  Booking,
  BookingPaginationResponse,
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
import { BookingService } from './booking.service';
import { RolesGuard } from '../../guard/role.guard';

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
    private readonly bookingSvc: BookingService,
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
          merchantId: merchant.id,
          branchId: branchService.branchId,
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

  @Query(() => BookingPaginationResponse)
  @UseGuards(GqlAuthGuard)
  async findAllBookingByMerchant(
    @CurrentUser() user: User,
    @Args('q', { nullable: true }) q?: string,
    @Args('limit', { nullable: true }) limit?: number,
    @Args('page', { nullable: true }) page?: number,
    @Args('orderBy', { nullable: true }) orderBy?: string,
    @Args('orderDirection', { nullable: true }) orderDirection?: string,
  ): Promise<BookingPaginationResponse> {
    const merchant = await this.merchantSvc.findOne({
      where: JSON.stringify({
        userId: user.id,
      }),
    });

    const re = await this.bookingSvc.findAllByMerchant({
      where: JSON.stringify({
        merchantId: merchant.id,
      }),
      searchKey: !isEmpty(q) ? `%${q}%` : undefined,
      page: page ? page : 1,
      limit: limit ? limit : 10,
      orderBy: orderBy ? orderBy : 'updatedAt',
      orderDirection: orderDirection ? orderDirection : 'DESC',
    });
    return re;
  }

  @Query(() => BookingPayload)
  @UseGuards(GqlAuthGuard)
  async findBookingById(@CurrentUser() user: User, @Args('id') id?: number): Promise<BookingPayload> {
    const booking = await this.bookingSvc.findById({
      id,
    });
    return { booking };
  }

  @Mutation(() => BookingPayload)
  @UseGuards(GqlAuthGuard)
  async adminUpdateBooking(
    @CurrentUser() user: User,
    @Args('id') id?: number,
    @Args('data') data?: PartialUpdateBooking,
  ): Promise<BookingPayload> {
    const booking = await this.bookingSvc.update({
      id,
      data: {
        ...data,
        isAdminUpdate: true,
        adminUpdateId: user.id,
      },
    });
    return { booking };
  }

  // @Mutation(() => BookingPayload)
  // @UseGuards(GqlAuthGuard, RolesGuard)
  // async customerUpdateBooking(
  //   @CurrentUser() user: User,
  //   @Args('id') id?: number,
  //   @Args('data') data?: PartialUpdateBooking,
  // ): Promise<BookingPayload> {
  //   const booking = await this.bookingSvc.update({
  //     id,
  //     data: {
  //       ...data,
  //       isAdminUpdate: true,
  //       adminUpdateId: user.id,
  //     },
  //   });
  //   return { booking };
  // }
}
