import { Migration } from '@mikro-orm/migrations';

export class Migration20230306170708 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "merchants" ("id" serial primary key, "created_at" bigint not null default 1678122427, "updated_at" bigint not null default 1678122427, "name" varchar(255) not null, "phone" varchar(255) not null, "address" varchar(255) not null, "city_code" int null, "district_code" int null, "ward_code" int null);');
    this.addSql('alter table "merchants" add constraint "merchants_phone_unique" unique ("phone");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "merchants" cascade;');
  }

}
