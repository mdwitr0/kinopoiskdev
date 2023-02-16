import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class Episode {
  @ApiPropertyOptional()
  @Prop()
  movieId: number;

  @ApiPropertyOptional()
  @Prop()
  seasonNumber?: number;

  @ApiPropertyOptional()
  @Prop()
  episodeNumber?: number;

  @ApiPropertyOptional()
  @Prop()
  name?: string;

  @ApiPropertyOptional()
  @Prop()
  alternativeName?: string;

  @ApiPropertyOptional()
  @Prop()
  description?: string;

  @ApiPropertyOptional()
  @Prop({ type: () => Date })
  date?: string;
}

export type SeasonDocument = HydratedDocument<Season>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Season {
  @ApiPropertyOptional()
  @Prop({ index: true })
  movieId: number;

  @ApiPropertyOptional()
  @Prop()
  number: number;

  @ApiPropertyOptional()
  @Prop()
  episodesCount: number;

  @ApiPropertyOptional({ type: () => Episode, isArray: true })
  @Prop({ type: () => [Episode] })
  episodes: Episode[];
}

export const SeasonSchema = SchemaFactory.createForClass(Episode);
