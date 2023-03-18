import { Module } from '@nestjs/common';
import { ClientGrpcProxy, ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UserResolver } from './user.resolver';
import { UtilsModule } from '../../utils/utils.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EGrpcClientService } from '../../enums/grpc-services.enum';

@Module({
  imports: [ConfigModule, UtilsModule],
  providers: [
    UserResolver,
    {
      provide: EGrpcClientService.USER_SERVICE,
      useFactory: (configService: ConfigService): ClientGrpcProxy => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('USERS_SVC_URL'),
            package: 'user',
            protoPath: join(__dirname, '/../../protos/user.proto'),
            loader: {
              keepCase: true,
              enums: String,
              oneofs: true,
              arrays: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [EGrpcClientService.USER_SERVICE],
})
export class UserModule {}
