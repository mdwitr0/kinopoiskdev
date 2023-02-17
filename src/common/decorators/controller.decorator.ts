import {
  applyDecorators,
  ClassSerializerInterceptor,
  Controller as ControllerDecorator,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const Controller = (name: string, tag?: string) => {
  return applyDecorators(
    ControllerDecorator(name),
    UseInterceptors(ClassSerializerInterceptor),
    SerializeOptions({ excludeExtraneousValues: true }),
    ApiTags(tag || name),
  );
};
