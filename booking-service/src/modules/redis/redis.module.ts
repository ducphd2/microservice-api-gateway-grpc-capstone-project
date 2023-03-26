import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';

@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          config: {
            host: configService.get<string>('REDIS_HOST'),
            port: configService.get<number>('REDIS_PORT'),
            password: configService.get<string>('REDIS_PASSWORD'),
            db: configService.get<number>('REDIS_DB') || 0,
            keyPrefix: configService.get<string>('REDIS_PREFIX_KEY'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class IoRedisModule {}
