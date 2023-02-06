import { IsArray } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ToolsQueryDto {
  @ApiPropertyOptional({
    description:
      'Поля которые нужно вывести в ответе. Если не указано, то будут выведены поля по умолчанию',
    example: 'id name',
    isArray: true,
  })
  @Expose()
  @IsArray()
  selectFields: string[];
}
