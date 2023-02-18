import {
  applyDecorators,
  ClassSerializerInterceptor,
  Controller as ControllerDecorator,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TokenAuthGuard } from 'src/auth/guards/token-auth.guard';
import { RemoveSystemFieldsInterceptor } from '../interceptor/remove-system-field.interceptor';

export const Controller = (name: string, tag?: string) => {
  return applyDecorators(
    UseInterceptors(RemoveSystemFieldsInterceptor),
    UseGuards(TokenAuthGuard),
    ControllerDecorator(name),
    UseInterceptors(ClassSerializerInterceptor),
    SerializeOptions({ excludeExtraneousValues: true }),
    ApiTags(tag || name),
  );
};
