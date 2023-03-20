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

registerEnumType(EUserRole, {
  name: 'EUserRole',
});

registerEnumType(EUserGender, {
  name: 'EUserGender',
});
