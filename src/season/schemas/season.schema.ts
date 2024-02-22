import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ShortImage } from '../../movie/schemas/movie.schema';

export class Episode {
  @Prop({ type: () => ShortImage })
  still: ShortImage;

  @ApiPropertyOptional()
  @Prop()
  number?: number;

  @ApiPropertyOptional()
  @Prop()
  name?: string;

  @ApiPropertyOptional()
  @Prop()
  enName?: string;

  @ApiPropertyOptional()
  @Prop(() => Date)
  airDate?: string;

  @ApiPropertyOptional({ deprecated: true })
  @Prop(() => Date)
  date?: string;

  @ApiPropertyOptional()
  @Prop()
  description?: string;

  @ApiPropertyOptional()
  @Prop()
  enDescription?: string;
}

export type SeasonDocument = HydratedDocument<Season>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Season {
  @ApiProperty()
  @Prop({ index: true })
  movieId: number;

  @ApiPropertyOptional()
  @Prop({ type: () => ShortImage })
  poster?: ShortImage;

  @ApiPropertyOptional()
  @Prop()
  number?: number;

  @ApiPropertyOptional()
  @Prop()
  name?: string;

  @ApiPropertyOptional()
  @Prop()
  enName?: string;

  @Prop()
  duration?: number;

  @Prop()
  description?: string;

  @Prop()
  enDescription?: string;

  @ApiPropertyOptional()
  @Prop()
  episodesCount?: number;

  @ApiPropertyOptional()
  @Prop(() => Date)
  airDate?: string;

  @ApiPropertyOptional({ type: () => Episode, isArray: true })
  @Prop({ type: () => [Episode] })
  episodes: Episode[];

  @Prop()
  updatedAt: Date;
  @Prop()
  createdAt: Date;
}

export const SeasonSchema = SchemaFactory.createForClass(Season);
