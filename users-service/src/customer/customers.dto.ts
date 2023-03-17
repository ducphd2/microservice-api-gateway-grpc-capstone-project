export interface ICustomerDto {
  readonly id?: number;
  readonly fullName?: string;
  readonly email?: string;
  readonly password?: string;
  readonly createdAt?: number;
  readonly updatedAt?: number;
  readonly version?: number;
  readonly dobDay?: number;
  readonly dobMonth?: number;
  readonly dobYear?: number;
  readonly occupation?: string;
  readonly avatar?: string;
  readonly status?: string;
  readonly role?: string;
  readonly gender?: string;
  readonly contact?: string;
}
