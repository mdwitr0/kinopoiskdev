import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { ApiNullableProperty } from '../../common/decorators/api-nullable-property.decorator';
import { READ_PREFERENCE } from '../../common/configs/mongo.config';

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
  read: READ_PREFERENCE,
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

  @Prop({ index: true })
  updatedAt: Date;
  @Prop({ index: true })
  createdAt: Date;
}
export const ImageSchema = SchemaFactory.createForClass(Image);
