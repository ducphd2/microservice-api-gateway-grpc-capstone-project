import { registerEnumType } from '@nestjs/graphql';

export enum EBookingStatus {
  PENDING = 'pending',
  APPROVE = 'approve',
  CANCELLED = 'cancelled',
}

export enum ECustomerBookingStatus {
  PENDING = 'pending',
  CANCELLED = 'cancelled',
}

registerEnumType(EBookingStatus, {
  name: 'EBookingStatus',
});

registerEnumType(ECustomerBookingStatus, {
  name: 'ECustomerBookingStatus',
});
