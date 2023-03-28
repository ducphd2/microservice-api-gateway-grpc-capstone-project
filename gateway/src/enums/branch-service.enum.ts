import { registerEnumType } from '@nestjs/graphql';

export enum EBranchServiceStatus {
  active = 1,
  pending = 2,
}

export enum EBranchServiceShowType {
  both_in_screen = 1,
  only_cashier = 2,
  only_booking = 3,
  not_at_all = 4,
}

registerEnumType(EBranchServiceStatus, {
  name: 'EBranchServiceStatus',
});

registerEnumType(EBranchServiceShowType, {
  name: 'EBranchServiceShowType',
});
