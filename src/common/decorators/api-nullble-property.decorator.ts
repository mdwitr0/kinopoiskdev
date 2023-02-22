import { ApiPropertyOptional, ApiPropertyOptions } from '@nestjs/swagger';

export const ApiNullablePropery = (options?: Omit<ApiPropertyOptions, 'nullable'>) =>
  ApiPropertyOptional({
    ...options,
    nullable: true,
  });
