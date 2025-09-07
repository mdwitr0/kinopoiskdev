import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EpisodeV1 {
  @ApiPropertyOptional()
  number?: number;

  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  enName?: string;

  @ApiPropertyOptional({ deprecated: true })
  date?: string;

  @ApiPropertyOptional()
  description?: string;
}

export class SeasonV1 {
  @ApiProperty()
  movieId: number;

  @ApiPropertyOptional()
  number?: number;

  @ApiPropertyOptional()
  episodesCount?: number;

  @ApiPropertyOptional({ type: () => EpisodeV1, isArray: true })
  episodes: EpisodeV1[];
}
