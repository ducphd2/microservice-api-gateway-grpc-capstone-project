import { registerEnumType } from '@nestjs/graphql';

export enum ECommonOrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(ECommonOrderDirection, {
  name: 'ECommonOrderDirection',
});
