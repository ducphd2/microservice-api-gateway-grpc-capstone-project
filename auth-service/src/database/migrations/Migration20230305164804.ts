import { Migration } from '@mikro-orm/migrations';

export class Migration20230305164804 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "profiles" alter column "created_at" type bigint using ("created_at"::bigint);');
    this.addSql('alter table "profiles" alter column "created_at" set default 1678034883;');
    this.addSql('alter table "profiles" alter column "updated_at" type bigint using ("updated_at"::bigint);');
    this.addSql('alter table "profiles" alter column "updated_at" set default 1678034883;');
    this.addSql('alter table "profiles" alter column "city_code" type int using ("city_code"::int);');
    this.addSql('alter table "profiles" alter column "city_code" drop not null;');
    this.addSql('alter table "profiles" alter column "district_code" type int using ("district_code"::int);');
    this.addSql('alter table "profiles" alter column "district_code" drop not null;');
    this.addSql('alter table "profiles" alter column "ward_code" type int using ("ward_code"::int);');
    this.addSql('alter table "profiles" alter column "ward_code" drop not null;');

    this.addSql('alter table "users" alter column "created_at" type bigint using ("created_at"::bigint);');
    this.addSql('alter table "users" alter column "created_at" set default 1678034883;');
    this.addSql('alter table "users" alter column "updated_at" type bigint using ("updated_at"::bigint);');
    this.addSql('alter table "users" alter column "updated_at" set default 1678034883;');
    this.addSql('alter table "users" alter column "username" type varchar(255) using ("username"::varchar(255));');
    this.addSql('alter table "users" alter column "username" set default \'cb43708f-99cd-40e1-947b-bc473d87105c\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "profiles" alter column "created_at" type bigint using ("created_at"::bigint);');
    this.addSql('alter table "profiles" alter column "created_at" set default 1678033141;');
    this.addSql('alter table "profiles" alter column "updated_at" type bigint using ("updated_at"::bigint);');
    this.addSql('alter table "profiles" alter column "updated_at" set default 1678033141;');
    this.addSql('alter table "profiles" alter column "city_code" type int using ("city_code"::int);');
    this.addSql('alter table "profiles" alter column "city_code" set not null;');
    this.addSql('alter table "profiles" alter column "district_code" type int using ("district_code"::int);');
    this.addSql('alter table "profiles" alter column "district_code" set not null;');
    this.addSql('alter table "profiles" alter column "ward_code" type int using ("ward_code"::int);');
    this.addSql('alter table "profiles" alter column "ward_code" set not null;');

    this.addSql('alter table "users" alter column "created_at" type bigint using ("created_at"::bigint);');
    this.addSql('alter table "users" alter column "created_at" set default 1678033141;');
    this.addSql('alter table "users" alter column "updated_at" type bigint using ("updated_at"::bigint);');
    this.addSql('alter table "users" alter column "updated_at" set default 1678033141;');
    this.addSql('alter table "users" alter column "username" type varchar(255) using ("username"::varchar(255));');
    this.addSql('alter table "users" alter column "username" set default \'5c37ad11-412c-4115-b791-0834aa0fe94e\';');
  }

}
