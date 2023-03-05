import { Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export const resolveError = (error: any) => {
  new Logger(resolveError.name).error('Handle error in merchant service', error);

  const statusCode = error.error.code;
  if (statusCode == 400 || statusCode === 403 || statusCode === 404) {
    throw new RpcException(error.error);
  } else {
    throw new RpcException({
      message: 'Internal server',
      code: 500,
    });
  }
};
