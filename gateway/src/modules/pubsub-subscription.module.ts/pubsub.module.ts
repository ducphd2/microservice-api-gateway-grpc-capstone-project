import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import Redis, { RedisOptions } from 'ioredis';
import { RedisPubSub } from 'graphql-redis-subscriptions';

export const PUB_SUB = 'PUB_SUB';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PUB_SUB,
      useFactory: async (configService: ConfigService): Promise<RedisPubSub> => {
        const redisOptions: RedisOptions = {
          host: configService.get<string>('REDIS_HOST'),
          username: configService.get<string>('REDIS_USERNAME'),
          port: configService.get<number>('REDIS_PORT'),
          password: configService.get<string>('REDIS_PASSWORD'),
          db: configService.get<number>('REDIS_DB'),
        };

        return new RedisPubSub({
          publisher: new Redis(redisOptions),
          subscriber: new Redis(redisOptions),
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [PUB_SUB],
})
export class PubSubModule {}
