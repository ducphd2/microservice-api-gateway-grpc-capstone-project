import { Migration } from '@mikro-orm/migrations';

export class Migration20230305161902 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "profiles" ("id" serial primary key, "created_at" bigint not null default 1678033141, "updated_at" bigint not null default 1678033141, "full_name" varchar(255) not null, "phone" varchar(255) not null, "type" smallint not null default 2, "address" varchar(255) not null, "city_code" int not null, "district_code" int not null, "ward_code" int not null, "date_of_birth" int null, "month_of_birth" int null, "year_of_birth" int null, "user_id" int not null);');

    this.addSql('create table "users" ("id" serial primary key, "created_at" bigint not null default 1678033141, "updated_at" bigint not null default 1678033141, "email" varchar(255) not null, "username" varchar(255) not null default \'5c37ad11-412c-4115-b791-0834aa0fe94e\', "password" varchar(255) not null, "role" smallint not null default 2);');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "profiles" cascade;');

    this.addSql('drop table if exists "users" cascade;');
  }

}
