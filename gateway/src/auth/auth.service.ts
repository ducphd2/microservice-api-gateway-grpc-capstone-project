import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../interfaces/users';

@Injectable()
export class AuthService {
  constructor(
    @Inject('JwtAccessTokenService')
    private readonly accessTokenService: JwtService,

    @Inject('JwtRefreshTokenService')
    private readonly refreshTokenService: JwtService,
  ) {}

  async generateAccessToken(user: IUser): Promise<string> {
    return this.accessTokenService.sign(
      {
        user: user.id,
      },
      {
        subject: user.id.toString(),
      },
    );
  }

  async generateRefreshToken(user: IUser): Promise<string> {
    return this.refreshTokenService.sign(
      {
        user: user.id,
      },
      {
        subject: user.id.toString(),
      },
    );
  }
}
