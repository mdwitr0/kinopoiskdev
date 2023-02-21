import { AbstractErrorResponseDto } from '../abstract/abstract-error.response.dto';

export abstract class UnauthorizedErrorResponseDto extends AbstractErrorResponseDto({
  statusCode: 401,
  message: 'В запросе не указан токен!',
  error: 'Unauthorized',
}) {}
