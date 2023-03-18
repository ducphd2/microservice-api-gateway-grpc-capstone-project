import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { LoggerModule, PinoLogger } from 'nestjs-pino';
import { Op } from 'sequelize';
import { OperatorsAliases } from 'sequelize';

const operatorsAliases: OperatorsAliases = {
  _and: Op.and,
  _or: Op.or,
  _eq: Op.eq,
  _ne: Op.ne,
  _is: Op.is,
  _not: Op.not,
  _col: Op.col,
  _gt: Op.gt,
  _gte: Op.gte,
  _lt: Op.lt,
  _lte: Op.lte,
  _between: Op.between,
  _notBetween: Op.notBetween,
  _all: Op.all,
  _in: Op.in,
  _notIn: Op.notIn,
  _like: Op.like,
  _notLike: Op.notLike,
  _startsWith: Op.startsWith,
  _endsWith: Op.endsWith,
  _substring: Op.substring,
  _iLike: Op.iLike,
  _notILike: Op.notILike,
  _regexp: Op.regexp,
  _notRegexp: Op.notRegexp,
  _iRegexp: Op.iRegexp,
  _notIRegexp: Op.notIRegexp,
  _any: Op.any,
  _contains: Op.contains,
  _contained: Op.contained,
  _overlap: Op.overlap,
  _adjacent: Op.adjacent,
  _strictLeft: Op.strictLeft,
  _strictRight: Op.strictRight,
  _noExtendRight: Op.noExtendRight,
  _noExtendLeft: Op.noExtendLeft,
  _values: Op.values,
};

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule, LoggerModule],
      useFactory: async (configService: ConfigService, logger: PinoLogger): Promise<SequelizeModuleOptions> => ({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        logging: logger.info.bind(logger),
        typeValidation: true,
        operatorsAliases,
        autoLoadModels: true,
        synchronize: true,
        define: {
          timestamps: true,
          underscored: true,
          version: true,
          schema: configService.get<string>('DB_SCHEMA'),
        },
        dialectOptions:
          configService.get<string>('ENVIRONMENT') !== 'local'
            ? {
                ssl: {
                  require: true,
                  rejectUnauthorized: false,
                },
              }
            : {},
      }),
      inject: [ConfigService, PinoLogger],
    }),
  ],
})
export class PostgresqlModule {}
