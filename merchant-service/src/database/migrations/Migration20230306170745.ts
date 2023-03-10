import { Migration } from '@mikro-orm/migrations';

export class Migration20230306170745 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "merchant_branches" ("id" serial primary key, "created_at" bigint not null default 1678122464, "updated_at" bigint not null default 1678122464, "name" varchar(255) not null, "phone" varchar(255) not null, "address" varchar(255) not null, "city_code" int null, "district_code" int null, "ward_code" int null, "merchant_id" int not null);');
    this.addSql('alter table "merchant_branches" add constraint "merchant_branches_phone_unique" unique ("phone");');

    this.addSql('alter table "merchants" alter column "created_at" type bigint using ("created_at"::bigint);');
    this.addSql('alter table "merchants" alter column "created_at" set default 1678122464;');
    this.addSql('alter table "merchants" alter column "updated_at" type bigint using ("updated_at"::bigint);');
    this.addSql('alter table "merchants" alter column "updated_at" set default 1678122464;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "merchant_branches" cascade;');

    this.addSql('alter table "merchants" alter column "created_at" type bigint using ("created_at"::bigint);');
    this.addSql('alter table "merchants" alter column "created_at" set default 1678122427;');
    this.addSql('alter table "merchants" alter column "updated_at" type bigint using ("updated_at"::bigint);');
    this.addSql('alter table "merchants" alter column "updated_at" set default 1678122427;');
  }

}
