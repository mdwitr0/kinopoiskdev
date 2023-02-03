import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Review extends Document {
  @Prop({ required: true, unique: true, index: true })
  id: number;
  @Prop({ required: true, index: true })
  movieId: number;

  @Prop()
  title: string;

  @Prop()
  type: string;

  @Prop()
  review: string;

  @Prop()
  date: Date;

  @Prop()
  author: string;

  @Prop({ default: 0 })
  userRating: number;

  @Prop()
  authorId: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
ReviewSchema.plugin(mongoosePaginate);
