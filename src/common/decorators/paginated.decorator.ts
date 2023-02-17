import { applyDecorators, UsePipes } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { PaginatedQueryDto } from '../dto/query/paginated.query.dto';
import { ToolsQueryDto } from '../dto/query/tools.query.dto';
import { QueryPipe } from '../pipes/query.pipe';
import { ApiDotNotationQuery } from './api-dot-notation-query.decorator';

export const Paginated = (entity: any, entityDto: any) => {
  return applyDecorators(
    UsePipes(new QueryPipe()),
    ApiDotNotationQuery(ToolsQueryDto, PaginatedQueryDto, entity),
    ApiResponse({ type: entityDto, isArray: true }),
  );
};
