import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { GqlLoggingInterceptor } from './interceptors/logging.interceptor';
import { BookingModule } from './modules/booking/booking.module';
import { MerchantCategoryModule } from './modules/category/category.module';
import { CustomerModule } from './modules/customer/customer.module';
import { MerchantBranchModule } from './modules/merchant-branch/merchant-branch.module';
import { MerchantModule } from './modules/merchant/merchant.module';
import { UserModule } from './modules/user/user.module';
import { BullConsumerModule } from './modules/comsumer/consumer.module';
import { NotificationEventModule } from './modules/notification-event/notification-event.module';

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
      installSubscriptionHandlers: true,
    }),
    AuthModule,
    UserModule,
    MerchantModule,
    MerchantBranchModule,
    MerchantCategoryModule,
    CustomerModule,
    BookingModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          username: configService.get<string>('REDIS_USERNAME'),
          port: configService.get<number>('REDIS_PORT'),
          password: configService.get<string>('REDIS_PASSWORD'),
          db: configService.get<number>('REDIS_DB') || 0,
        },
        defaultJobOptions: {
          removeOnComplete: true,
          removeOnFail: false,
          timeout: 30000,
          attempts: 3,
          backoff: 3000,
          delay: 1000,
          stackTraceLimit: 10,
        },
      }),
      inject: [ConfigService],
    }),
    BullConsumerModule,
    NotificationEventModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: GqlLoggingInterceptor,
    },
  ],
})
export class AppModule {}
