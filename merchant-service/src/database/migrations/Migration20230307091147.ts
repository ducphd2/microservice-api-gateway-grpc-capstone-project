import { Migration } from '@mikro-orm/migrations';

export class Migration20230307091147 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "merchants" add column "profile_id" int not null;');
    this.addSql('alter table "merchants" alter column "created_at" type bigint using ("created_at"::bigint);');
    this.addSql('alter table "merchants" alter column "created_at" set default 1678180306;');
    this.addSql('alter table "merchants" alter column "updated_at" type bigint using ("updated_at"::bigint);');
    this.addSql('alter table "merchants" alter column "updated_at" set default 1678180306;');

    this.addSql('alter table "merchant_branches" add column "profile_id" int not null;');
    this.addSql('alter table "merchant_branches" alter column "created_at" type bigint using ("created_at"::bigint);');
    this.addSql('alter table "merchant_branches" alter column "created_at" set default 1678180306;');
    this.addSql('alter table "merchant_branches" alter column "updated_at" type bigint using ("updated_at"::bigint);');
    this.addSql('alter table "merchant_branches" alter column "updated_at" set default 1678180306;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "merchants" alter column "created_at" type bigint using ("created_at"::bigint);');
    this.addSql('alter table "merchants" alter column "created_at" set default 1678122464;');
    this.addSql('alter table "merchants" alter column "updated_at" type bigint using ("updated_at"::bigint);');
    this.addSql('alter table "merchants" alter column "updated_at" set default 1678122464;');
    this.addSql('alter table "merchants" drop column "profile_id";');

    this.addSql('alter table "merchant_branches" alter column "created_at" type bigint using ("created_at"::bigint);');
    this.addSql('alter table "merchant_branches" alter column "created_at" set default 1678122464;');
    this.addSql('alter table "merchant_branches" alter column "updated_at" type bigint using ("updated_at"::bigint);');
    this.addSql('alter table "merchant_branches" alter column "updated_at" set default 1678122464;');
    this.addSql('alter table "merchant_branches" drop column "profile_id";');
  }

}
