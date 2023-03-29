import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../modules/user/user.module';
import { UtilsModule } from '../utils/utils.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { JwtStrategy } from './jwt.strategy';
import { MerchantModule } from '../modules/merchants/merchants.module';

@Module({
  imports: [MerchantModule, UtilsModule, PassportModule.register({ defaultStrategy: 'jwt' }), UserModule],
  providers: [
    AuthResolver,
    AuthService,
    JwtStrategy,
    JwtRefreshStrategy,
    {
      provide: 'JwtAccessTokenService',
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtService => {
        return new JwtService({
          secret: configService.get<string>('JWT_PRIVATE_KEY'),
          signOptions: {
            audience: configService.get<string>('JWT_AUDIENCE'),
            issuer: configService.get<string>('JWT_ISSUER'),
            expiresIn: '30d',
          },
        });
      },
    },
    {
      provide: 'JwtRefreshTokenService',
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtService => {
        return new JwtService({
          secret: configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
          signOptions: {
            audience: configService.get<string>('JWT_AUDIENCE'),
            issuer: configService.get<string>('JWT_ISSUER'),
            expiresIn: '30d',
          },
        });
      },
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
