import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { verify } from 'argon2';
import { sign } from 'jsonwebtoken';
import { JWT_PRIVATE_KEY } from '../constants';
import { User } from '../database/entities/user.entity';
import { resolveError } from '../error/error';
import { InputLoginRequest } from '../interfaces/user/input-login.interface';
import { InputRegisterUserRequest } from '../interfaces/user/input-register.interface';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: EntityRepository<User>,
    private readonly profileService: ProfileService,
  ) {}

  async register(registerInput: InputRegisterUserRequest) {
    const { email, password } = registerInput;

    try {
      const currentUser = await this.userRepository.findOne({
        email,
      });

      if (currentUser) {
        throw new RpcException({
          message: 'Email is existed',
          code: HttpStatus.BAD_REQUEST,
        });
      }

      const newUser = new User();
      newUser.email = email;
      newUser.password = password;

      const userDb = this.userRepository.create(newUser);

      await this.userRepository.persistAndFlush(userDb);

      const accessToken = await this.signToken({
        id: userDb.id,
        email: userDb.email,
      } as User);

      const profile = await this.profileService.create(
        userDb.id,
        registerInput,
      );

      return {
        user: userDb,
        profile,
        accessToken,
      };
    } catch (error) {
      resolveError(error);
    }
  }

  async login(loginInput: InputLoginRequest) {
    const { email, password } = loginInput;
    try {
      const findUser = await this.userRepository.findOne({
        email,
      });

      if (!findUser) {
        throw new RpcException({
          message: 'Email or password is incorrect',
          code: 400,
        });
      }

      const correctPassword = await verify(findUser.password, password);
      if (!correctPassword) {
        throw new RpcException({
          message: 'Email or password is incorrect',
          code: 400,
        });
      }

      const accessToken = await this.signToken({
        id: findUser.id,
        email: findUser.email,
      } as User);

      return {
        user: findUser,
        accessToken,
      };
    } catch (error) {
      resolveError(error);
    }
  }

  async signToken(user: User) {
    return sign(user, JWT_PRIVATE_KEY);
  }
}
