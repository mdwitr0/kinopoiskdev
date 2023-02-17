import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

type Constructor<T> = new (...args: any[]) => T;

export function AbstractFindManyDto<TQueryDto, TSortDto, TPaginationDto>(
  QueryDto: Constructor<TQueryDto>,
  SortDto: Constructor<TSortDto>,
  PaginationDto: Constructor<TPaginationDto>,
) {
  abstract class AbstractFindManyDto {
    @Type(() => QueryDto)
    @IsOptional()
    @ValidateNested()
    public query: TQueryDto;

    @Type(() => SortDto)
    @IsOptional()
    @ValidateNested()
    public sortQuery: TSortDto;

    @Type(() => PaginationDto)
    @IsOptional()
    @ValidateNested()
    public pagination: TPaginationDto;

    protected constructor(partials: Partial<AbstractFindManyDto>) {
      Object.assign(this, partials);
    }
  }

  return AbstractFindManyDto;
}
