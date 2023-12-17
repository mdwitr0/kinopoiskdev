import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const { id, method, query, params, url, headers, raw } = req;
    const { statusCode } = res;

    const token = headers?.['x-api-key'] || query?.['token'];
    const ip = headers?.['cf-connecting-ip'] || headers?.['x-forwarded-for'];
    const host = headers?.['host'];
    const ua = headers?.['user-agent'];
    const country = headers?.['cf-ipcountry'];
    const user = raw?.['user'];
    const tariff = raw?.['user']?.['tariffId'];
    const urlObj = new URL(`http://api${url}`);

    const now = Date.now();

    return next.handle().pipe(
      tap(
        () => {
          const responseTime = Date.now() - now;

          this.logger.log(`${urlObj.pathname}`, {
            id,
            method,
            query,
            params,
            url,
            responseTime,
            statusCode,
            userId: user?.userId,
            username: user?.username,
            tokenId: user?.token,
            token: token,
            tariffName: tariff?.name,
            requestsUsed: user?.requestsUsed,
            ip,
            host,
            ua,
            country,
          });
        },
        (exception) => {
          const responseTime = Date.now() - now;
          this.logger.error(`${urlObj.pathname}`, exception, {
            id,
            method,
            query,
            params,
            url,
            responseTime,
            statusCode: exception.status,
            userId: user?.userId,
            username: user?.username,
            tokenId: user?.token,
            token: token,
            tariffName: tariff?.name,
            requestsUsed: user?.requestsUsed,
            ip,
            host,
            ua,
            country,
            response: exception.response,
          });
        },
      ),
    );
  }
}
