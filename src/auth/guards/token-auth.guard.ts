import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as ApiKey from 'uuid-apikey';

@Injectable()
export class TokenAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.raw.user;
    const isLimitNotExceeded = request.raw.isLimitNotExceeded;
    const token = request?.headers['x-api-key'] || request['query']['token'];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userToken = ApiKey.toAPIKey(user.token);
    if (!user || userToken !== token) {
      throw new UnauthorizedException('Токен указан некорректно!');
    }

    const violatedRulesForFreeTariff = !user.password && user.tariffId?.name?.toLowerCase() === 'free' && !user.inChat;

    const hasExhaustedRequests = user.tariffId.requestsLimit <= user.requestsUsed;

    if (violatedRulesForFreeTariff) {
      throw new ForbiddenException('Вы не выполнили обязательное условие для бесплатного тарифа!');
    }

    if (!isLimitNotExceeded) {
      throw new ForbiddenException(
        `Вы сделали более ${user.tariffId.requestsLimit} запросов за сутки. Лимиты будут обновлены в 00: 00. Чтобы получить больше лимитов и личный токен, напишите в telegram @mdwit`,
      );
    }

    return true;
  }
}
