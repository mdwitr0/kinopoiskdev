import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MovieFromKeyword {
  @ApiPropertyOptional()
  @Prop()
  id: number;
}

export type KeywordDocument = HydratedDocument<Keyword>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  collection: 'keywords',
})
export class Keyword {
  @ApiProperty()
  @Prop({ required: true, index: true })
  id: string;

  @ApiProperty()
  @Prop()
  title: string;

  @ApiPropertyOptional({ type: () => MovieFromKeyword })
  @Prop()
  movies: MovieFromKeyword;
}

export const KeywordSchema = SchemaFactory.createForClass(Keyword);
