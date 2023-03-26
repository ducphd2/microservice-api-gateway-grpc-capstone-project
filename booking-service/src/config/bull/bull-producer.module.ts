import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
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
          removeOnFail: true,
          timeout: 30000,
          attempts: 3,
          backoff: 3000,
          delay: 1000,
          stackTraceLimit: 10,
        },
        // prefix: configService.get<string>('BULL_PREFIX_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class BullQueueModule {}
