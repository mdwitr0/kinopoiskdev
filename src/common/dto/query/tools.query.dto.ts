import { IsArray } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ToolsQueryDto {
  @ApiPropertyOptional({
    description: 'Поля которые нужно вывести в ответе. Если не указано, то будут выведены поля по умолчанию',
    example: 'id name',
    isArray: true,
  })
  @Expose()
  @IsArray()
  selectFields: string[];

  @ApiPropertyOptional({
    description: 'Поля по которым нужно отсортировать. Доступны все любые поля из модели',
    example: 'year | rating.kp | votes.kp',
    isArray: true,
  })
  @Expose()
  @IsArray()
  sortField: string;

  @ApiPropertyOptional({
    description: 'Тип сортировки. Для каждого поля нужно указать тип сортировки: 1 - по возрастанию -1 - по убыванию',
    example: '1 | -1',
    isArray: true,
  })
  @Expose()
  @IsArray()
  sortType: string[];
}
