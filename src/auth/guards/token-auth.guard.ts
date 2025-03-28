import { CanActivate, ExecutionContext, ForbiddenException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as ApiKey from 'uuid-apikey';

@Injectable()
export class TokenAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.raw.user;
    const isLimitNotExceeded = request.raw.isLimitNotExceeded;
    const token = request?.headers['x-api-key'] || request['query']['token'];
    const logger = new Logger();

    logger.log(`Auth user form request`, {
      token,
      request: request.raw.url,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userToken = ApiKey.toAPIKey(user.token);
    if (!user || userToken !== token) {
      throw new UnauthorizedException('Токен указан некорректно!');
    }

    if (!isLimitNotExceeded) {
      throw new ForbiddenException(
        `Вы израсходовали ваш суточный лимит по запросам. Чтобы получить больше запросов, обновите тариф в боте @kinopoiskdev_bot'`,
      );
    }

    return true;
  }
}
