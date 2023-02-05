import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
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
}
export const ImageSchema = SchemaFactory.createForClass(Image);
