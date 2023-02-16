import { ApiResponse } from '@nestjs/swagger';
import { Get, Param, Query } from '@nestjs/common';
import { IQuery } from '../interfaces/query.interface';
import { PaginatedDecorator } from '../decorators/paginated.decorator';

type Constructor<T> = new (...args: any[]) => T;

export function BaseController<TEntity, TEntityDto>(
  Entity: Constructor<TEntity>,
  EntityDto: Constructor<TEntityDto>,
  description?: string,
) {
  abstract class BaseController {
    protected constructor(readonly service: any) {}

    @Get()
    @PaginatedDecorator(Entity, EntityDto, description)
    async finManyByQuery(@Query() query: IQuery): Promise<TEntityDto> {
      return this.service.findMany(query);
    }

    @ApiResponse({ type: Entity })
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<TEntity> {
      return this.service.findOne(+id);
    }
  }

  return BaseController;
}
