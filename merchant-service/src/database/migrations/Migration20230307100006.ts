import { Migration } from '@mikro-orm/migrations';

export class Migration20230307100006 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "merchants" alter column "created_at" type bigint using ("created_at"::bigint);');
    this.addSql('alter table "merchants" alter column "created_at" set default 1678183204;');
    this.addSql('alter table "merchants" alter column "updated_at" type bigint using ("updated_at"::bigint);');
    this.addSql('alter table "merchants" alter column "updated_at" set default 1678183204;');
    this.addSql('alter table "merchants" drop constraint "merchants_phone_unique";');

    this.addSql('alter table "merchant_branches" alter column "created_at" type bigint using ("created_at"::bigint);');
    this.addSql('alter table "merchant_branches" alter column "created_at" set default 1678183204;');
    this.addSql('alter table "merchant_branches" alter column "updated_at" type bigint using ("updated_at"::bigint);');
    this.addSql('alter table "merchant_branches" alter column "updated_at" set default 1678183204;');
    this.addSql('alter table "merchant_branches" drop constraint "merchant_branches_phone_unique";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "merchants" alter column "created_at" type bigint using ("created_at"::bigint);');
    this.addSql('alter table "merchants" alter column "created_at" set default 1678180306;');
    this.addSql('alter table "merchants" alter column "updated_at" type bigint using ("updated_at"::bigint);');
    this.addSql('alter table "merchants" alter column "updated_at" set default 1678180306;');
    this.addSql('alter table "merchants" add constraint "merchants_phone_unique" unique ("phone");');

    this.addSql('alter table "merchant_branches" alter column "created_at" type bigint using ("created_at"::bigint);');
    this.addSql('alter table "merchant_branches" alter column "created_at" set default 1678180306;');
    this.addSql('alter table "merchant_branches" alter column "updated_at" type bigint using ("updated_at"::bigint);');
    this.addSql('alter table "merchant_branches" alter column "updated_at" set default 1678180306;');
    this.addSql('alter table "merchant_branches" add constraint "merchant_branches_phone_unique" unique ("phone");');
  }

}
