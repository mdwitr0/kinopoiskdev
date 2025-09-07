import { applyDecorators } from '@nestjs/common';
import { ApiForbiddenResponse, ApiOkResponse, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ErrorResponseDto } from '../dto/errors/error.response.dto';
import { ForbiddenErrorResponseDto } from '../dto/errors/forbidden-error.response.dto';
import { UnauthorizedErrorResponseDto } from '../dto/errors/unauthorized-error.response.dto';

export const ApiBaseResponse = ({ type, isArray }: { type: any; isArray?: boolean }) => {
  return applyDecorators(
    ApiOkResponse({ type, isArray }),
    ApiUnauthorizedResponse({ type: UnauthorizedErrorResponseDto, description: 'Unauthorized' }),
    ApiForbiddenResponse({ type: ForbiddenErrorResponseDto, description: 'Forbidden' }),
    ApiResponse({ type: ErrorResponseDto, description: 'Other' }),
  );
};
