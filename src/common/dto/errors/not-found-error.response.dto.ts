import { AbstractErrorResponseDto } from '../abstract/abstract-error.response.dto';

export abstract class NotFoundErrorResponseDto extends AbstractErrorResponseDto({
  statusCode: 403,
  message: 'По этому id ничего не найдено!',
  error: 'NotFound',
}) {}
