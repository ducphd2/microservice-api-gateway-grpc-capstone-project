import { registerEnumType } from '@nestjs/graphql';

export enum ECustomerLevel {
  normal = 'normal',
  silver = 'silver',
  gold = 'gold',
  platinum = 'platinum',
}

registerEnumType(ECustomerLevel, {
  name: 'ECustomerLevel',
});
