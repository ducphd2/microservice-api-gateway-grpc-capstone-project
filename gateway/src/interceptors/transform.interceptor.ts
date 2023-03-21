import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(TransformInterceptor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const call$ = next.handle();
    const gqlContext = GqlExecutionContext.create(context);

    const resolverName = gqlContext.getInfo().fieldName;
    const args = JSON.stringify(gqlContext.getArgs());

    if (gqlContext.getType() == 'graphql') return call$.pipe(map((data) => data || 'OK'));

    return call$.pipe(
      map((data) => {
        const [resultKey] = Object.keys(data);
        return {
          status: gqlContext.switchToHttp().getResponse().statusCode,
          message: data?.message ?? 'OK',
          success: gqlContext.switchToHttp().getResponse().statusCode < 400 ? true : false,
          data: data[resultKey],
        };
      }),
    );
  }
}
