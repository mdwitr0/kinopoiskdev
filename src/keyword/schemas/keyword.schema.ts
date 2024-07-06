import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApiNullableProperty } from '../../common/decorators/api-nullable-property.decorator';
import { READ_PREFERENCE } from '../../common/configs/mongo.config';

export class MovieFromKeyword {
  @ApiProperty()
  @Prop()
  id: number;
}

export type KeywordDocument = HydratedDocument<Keyword>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  collection: 'keywords',
  read: READ_PREFERENCE,
})
export class Keyword {
  @ApiProperty()
  @Prop({ required: true, index: true })
  id: number;

  @ApiNullableProperty()
  @Prop()
  title: string;

  @ApiPropertyOptional({ type: () => MovieFromKeyword })
  @Prop()
  movies: MovieFromKeyword;

  @Prop({ index: true })
  updatedAt: Date;
  @Prop({ index: true })
  createdAt: Date;
}

export const KeywordSchema = SchemaFactory.createForClass(Keyword);
