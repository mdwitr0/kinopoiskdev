import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type ImageDocument = HydratedDocument<Image>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.__v;
    },
  },
  toObject: { virtuals: true },
})
export class Image {
  @ApiProperty()
  @Prop({ required: true, index: true })
  movieId: number;

  @ApiPropertyOptional()
  @Prop()
  type?: string;

  @ApiPropertyOptional()
  @Prop()
  language?: string;

  @ApiPropertyOptional()
  @Prop({ unique: true })
  url: string;

  @ApiPropertyOptional()
  @Prop()
  previewUrl?: string;

  @ApiPropertyOptional()
  @Prop()
  height?: number;

  @ApiPropertyOptional()
  @Prop()
  width?: number;

  @Prop()
  updatedAt: Date;
  @Prop()
  createdAt: Date;
}
export const ImageSchema = SchemaFactory.createForClass(Image);
