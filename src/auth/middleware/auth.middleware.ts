/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import * as ApiKey from 'uuid-apikey';
import { log } from 'readmeio';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
    const token = req?.headers['x-api-key'] || req['query']['token'];

    if (!token) {
      log(process.env.README_API_KEY, req, res, { apiKey: null, label: null });

      throw new UnauthorizedException('В запросе не указан токен!');
    }
    // @ts-ignore
    if (!ApiKey.isAPIKey(token)) {
      log(process.env.README_API_KEY, req, res, { apiKey: null, label: null });

      throw new UnauthorizedException('Переданный токен некорректен!');
    }

    const user = await this.authService.findUserByToken(token);

    const isLimitNotExceeded = await this.authService.checkAndDecreaseLimit(token);

    log(process.env.README_API_KEY, req, res, { apiKey: token, label: user.username || String(user.userId) });

    req['user'] = user;
    req['isLimitNotExceeded'] = isLimitNotExceeded;

    next();
  }
}
