import { AbstractErrorResponseDto } from '../abstract/abstract-error.response.dto';

export abstract class ForbiddenErrorResponseDto extends AbstractErrorResponseDto({
  statusCode: 403,
  message: 'Превышен дневной лимит!',
  error: 'Forbidden',
}) {}
