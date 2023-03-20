import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { GqlLoggingInterceptor } from './interceptors/logging.interceptor';
import { MerchantBranchModule } from './modules/branch/branch.module';
import { MerchantCategoryModule } from './modules/category/category.module';
import { CustomerModule } from './modules/customer/customer.module';
import { MerchantModule } from './modules/merchant/merchant.module';
import { UserModule } from './modules/user/user.module';

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
    UserModule,
    MerchantModule,
    MerchantBranchModule,
    MerchantCategoryModule,
    CustomerModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: GqlLoggingInterceptor,
    },
  ],
})
export class AppModule {}
