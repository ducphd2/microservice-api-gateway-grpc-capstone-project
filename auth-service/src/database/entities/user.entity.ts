import { BeforeCreate, Entity, Enum, Property } from '@mikro-orm/core';
import { UserRole } from '../../enums/user.enum';
import { BaseEntity } from './base.entity';
import { generateUniqueId, hashPassword } from '../../helpers';

@Entity({ tableName: 'users' })
export class User extends BaseEntity {
  @Property({ unique: true, nullable: false })
  email!: string;

  @Property()
  username: string = generateUniqueId;

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
