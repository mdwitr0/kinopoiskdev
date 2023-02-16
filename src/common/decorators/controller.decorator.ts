import {
  applyDecorators,
  ClassSerializerInterceptor,
  Controller,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const ControllerDecorator = (name: string, tag?: string) => {
  return applyDecorators(
    Controller(name),
    UseInterceptors(ClassSerializerInterceptor),
    SerializeOptions({ excludeExtraneousValues: true }),
    ApiTags(tag || name),
  );
};
