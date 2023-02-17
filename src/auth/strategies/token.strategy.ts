import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(token: string) {
    const user = await this.authService.findUserByToken(token);
    if (!user) throw new UnauthorizedException('Токен указан некорретно!');

    const violatedRulesForFreeTariff = !user.password && user.tariffId?.name?.toLowerCase() === 'free' && !user.inChat;

    const hasExhaustedRequests = user.tariffId.requestsLimit <= user.requestsUsed;

    if (!violatedRulesForFreeTariff)
      throw new ForbiddenException('Вы не выполнили обязательное условие для бесплатного тарифа!');

    if (hasExhaustedRequests)
      throw new ForbiddenException(
        `Вы сделали более ${user.tariffId.requestsLimit} запросов за сутки. Лимиты будут обновлены в 00: 00. Чтобы получить больше лимитов и личный токен, напишите в telegram @mdwit`,
      );

    return user;
  }
}
