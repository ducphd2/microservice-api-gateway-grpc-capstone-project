import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class ErrorHelper {
  static BadRequestException(message: string) {
    throw new RpcException({
      code: HttpStatus.BAD_REQUEST,
      message,
    });
  }

  static UnauthorizedException(message: string) {
    throw new RpcException({
      code: HttpStatus.UNAUTHORIZED,
      message,
    });
  }

  static NotFoundException(message: string) {
    throw new RpcException({
      code: HttpStatus.NOT_FOUND,
      message,
    });
  }

  static ForbiddenException(message: string) {
    throw new RpcException({
      code: HttpStatus.FORBIDDEN,
      message,
    });
  }

  static InternalServerErrorException(message: string) {
    throw new RpcException({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message,
    });
  }
}
