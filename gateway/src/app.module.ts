import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { GqlLoggingInterceptor } from './interceptors/logging.interceptor';
import { MerchantModule } from './merchant/merchant.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      context: ({ req, res }) => {
        return { req, res };
      },
    }),
    AuthModule,
    MerchantModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: GqlLoggingInterceptor,
    },
  ],
})
export class AppModule {}
