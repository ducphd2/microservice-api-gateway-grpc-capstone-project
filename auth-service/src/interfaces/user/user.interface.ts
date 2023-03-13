import { InputRegisterUserRequest } from './input-register.interface';

export interface IUser extends Partial<InputRegisterUserRequest> {
  id?: number;
}
