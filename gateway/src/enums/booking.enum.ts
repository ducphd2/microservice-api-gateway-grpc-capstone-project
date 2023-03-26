import { registerEnumType } from '@nestjs/graphql';

export enum EBookingStatus {
  PENDING = 'pending',
  APPROVE = 'approve',
  CANCELLED = 'cancelled',
}

registerEnumType(EBookingStatus, {
  name: 'EBookingStatus',
});
