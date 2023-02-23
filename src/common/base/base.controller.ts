import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Get, Param, Query } from '@nestjs/common';
import { IQuery } from '../interfaces/query.interface';
import { Paginated } from '../decorators/paginated.decorator';
import { ApiBaseResponse } from '../decorators/api-base-response.decorator';

type Constructor<T> = new (...args: any[]) => T;

export function BaseController<TEntity, TEntityDto>(
  Entity: Constructor<TEntity>,
  EntityDto: Constructor<TEntityDto>,
  description?: string,
) {
  abstract class BaseController {
    protected constructor(readonly service: any) {}

    @Get()
    @ApiOperation({ summary: description })
    @Paginated(EntityDto, Entity, { findForAllProperties: true })
    async finManyByQuery(@Query() query: IQuery): Promise<TEntityDto> {
      return this.service.findMany(query);
    }
  }

  return BaseController;
}

export function BaseControllerWithFindById<TEntity, TEntityDto>(
  Entity: Constructor<TEntity>,
  EntityDto: Constructor<TEntityDto>,
  summary?: string,
  description?: string,
) {
  abstract class BaseControllerWithFindById {
    protected constructor(readonly service: any) {}

    @Get()
    @ApiOperation({ summary, description })
    @Paginated(EntityDto, Entity, { findForAllProperties: true })
    async finManyByQuery(@Query() query: IQuery): Promise<TEntityDto> {
      return this.service.findMany(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Поиск по id' })
    @ApiBaseResponse({ type: Entity })
    async findOne(@Param('id') id: string): Promise<TEntity> {
      return this.service.findOne(+id);
    }
  }

  return BaseControllerWithFindById;
}
