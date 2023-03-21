import { registerEnumType } from '@nestjs/graphql';

export enum EUserRole {
  super_admin = 'super_admin',
  admin = 'admin',
  user = 'user',
}

export enum EUserGender {
  male = 'male',
  female = 'female',
  other = 'other',
}

export enum EUserStatus {
  active = 'active',
  banned = 'banned',
}

registerEnumType(EUserRole, {
  name: 'EUserRole',
});

registerEnumType(EUserGender, {
  name: 'EUserGender',
});

registerEnumType(EUserStatus, {
  name: 'EUserStatus',
});
