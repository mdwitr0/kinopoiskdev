import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { READ_PREFERENCE } from '../../common/configs/mongo.config';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  read: READ_PREFERENCE,
})
export class Review {
  @ApiProperty()
  @Prop({ required: true, unique: true, index: true })
  id: number;

  @ApiProperty()
  @Prop({ required: true, index: true })
  movieId: number;

  @ApiPropertyOptional()
  @Prop()
  title: string;

  @ApiPropertyOptional()
  @Prop()
  type: string;

  @ApiPropertyOptional()
  @Prop()
  review: string;

  @ApiPropertyOptional()
  @Prop({ type: () => Date })
  date: string;

  @ApiPropertyOptional()
  @Prop()
  author: string;

  @Prop({ default: 0 })
  @ApiPropertyOptional()
  userRating: number;

  @ApiProperty()
  @Prop()
  authorId: number;

  @Prop({ index: true })
  updatedAt: Date;
  @Prop({ index: true })
  createdAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
