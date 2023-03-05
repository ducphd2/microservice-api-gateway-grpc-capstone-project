import { BeforeCreate, Entity, Enum, Property } from '@mikro-orm/core';
import { UserRole } from '../../enums/user.enum';
import { generateUsername, hashPassword } from '../../helpers/user';
import { BaseEntity } from './base.entity';

@Entity({ tableName: 'users' })
export class User extends BaseEntity {
  @Property({ unique: true, nullable: false })
  email!: string;

  @Property()
  username: string = generateUsername;

  @Property({ nullable: false })
  password!: string;

  @Enum({
    default: UserRole.USER,
  })
  role: UserRole = UserRole.USER;

  @BeforeCreate()
  async hashPassword() {
    this.password = await hashPassword(this.password);
  }
}
