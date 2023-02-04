import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

type Constructor<T> = new (...args: any[]) => T;

export function AbstractDocsResponseDto<TEntityDto, T>(
  EntityDto: Constructor<TEntityDto>
) {
  abstract class AbstractDocsResponseDto {
    @Expose()
    @ApiProperty({ type: [EntityDto] })
    @Type(() => EntityDto)
    public docs: TEntityDto[];

    @Expose()
    @ApiProperty({ description: 'Общее количество результатов' })
    public total: number;

    @Expose()
    @ApiProperty({ description: 'Количество результатов на странице' })
    public limit: number;

    @Expose()
    @ApiProperty({ description: 'Текущая страница' })
    public page: number;

    @Expose()
    @ApiProperty({ description: 'Сколько страниц всего' })
    public pages: number;

    protected constructor(partials: Partial<AbstractDocsResponseDto>) {
      Object.assign(this, partials);
    }
  }

  return AbstractDocsResponseDto;
}
