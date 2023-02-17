import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../auth.service';

@Injectable()
export class TokenAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.raw.user;

    if (!user) {
      throw new UnauthorizedException('Токен указан некорректно!');
    }

    const violatedRulesForFreeTariff = !user.password && user.tariffId?.name?.toLowerCase() === 'free' && !user.inChat;

    const hasExhaustedRequests = user.tariffId.requestsLimit <= user.requestsUsed;

    if (violatedRulesForFreeTariff) {
      throw new ForbiddenException('Вы не выполнили обязательное условие для бесплатного тарифа!');
    }

    if (hasExhaustedRequests) {
      throw new ForbiddenException(
        `Вы сделали более ${user.tariffId.requestsLimit} запросов за сутки. Лимиты будут обновлены в 00: 00. Чтобы получить больше лимитов и личный токен, напишите в telegram @mdwit`,
      );
    }

    return true;
  }
}
