import { applyDecorators, Get, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaginatedQueryDto } from '../dto/query/paginated.query.dto';
import { ToolsQueryDto } from '../dto/query/tools.query.dto';
import { QueryPipe } from '../pipes/query.pipe';
import { ApiDotNotationQuery } from './api-dot-notation-query.decorator';

export const PaginatedDecorator = (
  entity: any,
  entityDto: any,
  description?: string,
) => {
  return applyDecorators(
    UsePipes(new QueryPipe()),
    ApiOperation({ summary: description }),
    ApiDotNotationQuery(ToolsQueryDto, PaginatedQueryDto, entity),
    ApiResponse({ type: entityDto, isArray: true }),
  );
};
