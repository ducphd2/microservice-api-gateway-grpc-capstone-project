import { Logger } from '@nestjs/common';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { Merchant, MerchantBranch } from './database/entities';

const configMikroOrm: MikroOrmModuleSyncOptions = {
  type: 'postgresql',
  host: process.env.DATABASE_HOST,
  dbName: process.env.DATABASE_DBNAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: Number(process.env.DATABASE_HOST),
  tsNode: true,
  discovery: {
    disableDynamicFileAccess: true,
  },
  entities: [Merchant, MerchantBranch],
  migrations: {
    path: 'dist/database/migrations',
    pathTs: 'src/database/migrations',
    disableForeignKeys: false,
  },
  allowGlobalContext: true,
  logger: (msg) => Logger.log(msg),
};

export default configMikroOrm;
