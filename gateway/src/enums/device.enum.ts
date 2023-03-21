import { registerEnumType } from '@nestjs/graphql';

export enum EDeviceOs {
  android = 'android',
  ios = 'ios',
}

registerEnumType(EDeviceOs, {
  name: 'EDeviceOs',
});
