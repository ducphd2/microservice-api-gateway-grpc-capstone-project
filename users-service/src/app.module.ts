import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { LoggerModule } from 'nestjs-pino';

import { PostgresqlModule } from './database/postgresql.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customer/customers.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        pinoHttp: {
          safe: true,
        },
      }),
      inject: [ConfigService],
    }),
    PostgresqlModule,
    UsersModule,
    CustomersModule,
  ],
})
export class AppModule {}
