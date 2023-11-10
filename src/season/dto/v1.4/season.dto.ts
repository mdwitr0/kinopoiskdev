import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ShortImage } from '../../../movie/schemas/movie.schema';
import { EpisodeV1, SeasonV1 } from '../v1/season.dto';
import { Expose } from 'class-transformer';

export class EpisodeV1_4 extends EpisodeV1 {
  @Expose()
  @ApiPropertyOptional({ type: () => ShortImage })
  still: ShortImage;

  @Expose()
  @ApiPropertyOptional()
  airDate?: string;

  @Expose()
  @ApiPropertyOptional({ deprecated: true })
  date?: string;

  @Expose()
  @ApiPropertyOptional()
  enDescription?: string;
}

export class SeasonV1_4 extends SeasonV1 {
  @Expose()
  @ApiPropertyOptional({ type: () => ShortImage })
  poster?: ShortImage;

  @Expose()
  @ApiPropertyOptional()
  name?: string;

  @Expose()
  @ApiPropertyOptional()
  enName?: string;

  @Expose()
  @ApiPropertyOptional()
  duration?: number;

  @Expose()
  @ApiPropertyOptional()
  description?: string;

  @Expose()
  @ApiPropertyOptional()
  enDescription?: string;

  @Expose()
  @ApiPropertyOptional()
  airDate?: string;

  @Expose()
  @ApiPropertyOptional({ type: () => EpisodeV1_4, isArray: true })
  episodes: EpisodeV1_4[];

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  createdAt: Date;
}
