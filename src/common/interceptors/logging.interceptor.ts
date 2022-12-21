import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    if (context.getType() !== 'http')
      return next.handle().pipe()

    const { method, url, body, params, query } = context
      .switchToHttp()
      .getRequest();
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        if (url.includes('health')) {
          return;
        }
        this.logger.log(`[${method}] ${url}: ${Date.now() - now}ms`);
        if (body && Object.keys(body).length)
          this.logger.log('BODY:', JSON.stringify(body));
        if (params && Object.keys(params).length)
          this.logger.log('PARAMS:', JSON.stringify(body));
        if (query && Object.keys(query).length)
          this.logger.log('QUERYSTRING:', JSON.stringify(body));
      }),
    );
  }
}
