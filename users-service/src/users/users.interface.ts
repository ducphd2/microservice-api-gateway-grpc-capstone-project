import { FindOptions } from 'sequelize';

import { IUserDto } from './dto';
import { IFindAndPaginateOptions, IFindAndPaginateResult } from '../commons/find-and-paginate.interface';
import { User } from '../database/models/user.model';
import { IId } from '../interfaces';

export interface IUsersService {
  find(query?: IFindAndPaginateOptions): Promise<IFindAndPaginateResult<User>>;
  findById(id: number): Promise<User>;
  findOne(query?: FindOptions): Promise<User>;
  count(query?: FindOptions): Promise<number>;
  create(comment: IUserDto): Promise<User>;
  update(id: number, comment: IUserDto): Promise<User>;
  destroy(query?: FindOptions): Promise<number>;
}
