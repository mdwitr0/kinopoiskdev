import { ApiPropertyOptional, ApiPropertyOptions } from '@nestjs/swagger';

export const ApiNullableProperty = (options?: Omit<ApiPropertyOptions, 'nullable'>) =>
  ApiPropertyOptional({
    ...options,
    nullable: true,
  });
