import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

type Constructor<T> = new (...args: any[]) => T;

export function AbstractDocsResponseDto<TEntityDto, T>(
  EntityDto: Constructor<TEntityDto>,
) {
  abstract class AbstractDocsResponseDto {
    @ApiProperty({ type: [EntityDto] })
    @Type(() => EntityDto)
    public docs: TEntityDto[];

    @ApiProperty({ description: 'Общее количество результатов' })
    public total: number;

    @ApiProperty({ description: 'Количество результатов на странице' })
    public limit: number;

    @ApiProperty({ description: 'Текущая страница' })
    public page: number;

    @ApiProperty({ description: 'Сколько страниц всего' })
    public pages: number;

    protected constructor(partials: Partial<AbstractDocsResponseDto>) {
      Object.assign(this, partials);
    }
  }

  return AbstractDocsResponseDto;
}
