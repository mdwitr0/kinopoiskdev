import { ApiProperty } from '@nestjs/swagger';

export function AbstractErrorResponseDto({
  statusCode,
  message,
  error,
}: {
  statusCode: number;
  message: string;
  error: string;
}) {
  abstract class AbstractErrorResponseDto {
    @ApiProperty({ example: statusCode })
    statusCode: number;

    @ApiProperty({ example: message })
    message: string;

    @ApiProperty({ example: error })
    error: string;
  }

  return AbstractErrorResponseDto;
}
