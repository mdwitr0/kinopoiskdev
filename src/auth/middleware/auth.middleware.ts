/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable, NestMiddleware, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import * as ApiKey from 'uuid-apikey';
import { TariffConfigServiceImpl } from '../services/tariff-config.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly tariffConfigService: TariffConfigServiceImpl,
  ) {}

  async use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
    const token = req?.headers['x-api-key'] || req['query']['token'];

    if (!token) {
      throw new UnauthorizedException('В запросе не указан токен!');
    }
    // @ts-ignore
    if (!ApiKey.isAPIKey(token)) {
      throw new UnauthorizedException('Переданный токен некорректен!');
    }

    const user = await this.authService.findUserByToken(token);

    if (!user) {
      throw new UnauthorizedException('Пользователь не найден!');
    }

    const tariffName = user.tariffId.name;
    if (!this.tariffConfigService.isTariffAllowed(tariffName)) {
      throw new ForbiddenException(`Доступ для вашего тарифа временно недоступен`);
    }

    const isLimitNotExceeded = await this.authService.checkAndDecreaseLimit(token);

    req['user'] = user;
    req['isLimitNotExceeded'] = isLimitNotExceeded;

    next();
  }
}
