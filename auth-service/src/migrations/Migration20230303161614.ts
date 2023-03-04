import { Migration } from '@mikro-orm/migrations';

export class Migration20230303161614 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" serial primary key, "created_at" bigint not null default 1677860172, "updated_at" bigint not null default 1677860172, "email" varchar(255) not null, "username" varchar(255) not null, "age" int not null default 18, "password" varchar(255) not null, "role" smallint not null default 2);');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "users" cascade;');
  }

}
