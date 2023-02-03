import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Image {
  @Prop({ required: true, index: true })
  movieId: number;

  @Prop()
  type?: string;

  @Prop()
  language?: string;

  @Prop({ unique: true })
  url: string;

  @Prop()
  previewUrl?: string;

  @Prop()
  height?: number;

  @Prop()
  width?: number;
}
export const ImageSchema = SchemaFactory.createForClass(Image);
ImageSchema.plugin(mongoosePaginate);
