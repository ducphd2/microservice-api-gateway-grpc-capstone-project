import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Merchant } from './cv.entity';
import { BaseEntity } from './baseEntity';

@Entity({ tableName: 'education_certifications' })
export class EducationCertification extends BaseEntity {
  @Property()
  name: string;

  @Property({
    length: 50,
  })
  time: string;

  @Property({
    length: 50,
  })
  major: string;

  @Property({
    default: false,
  })
  isDeleted: boolean;

  @ManyToOne({
    entity: () => Merchant,
  })
  cv!: Merchant;

  constructor(name: string, time: string, major: string) {
    super();
    this.name = name;
    this.time = time;
    this.major = major;
  }
}
