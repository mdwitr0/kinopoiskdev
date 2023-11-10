import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ShortImage } from '../../movie/schemas/movie.schema';
import { ApiProperty } from '@nestjs/swagger';

export type ListDocument = HydratedDocument<List>;

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
export class List {
  @ApiProperty()
  @Prop()
  category: string;

  @Prop()
  name: string;

  @ApiProperty()
  @Prop({ unique: true })
  slug: string;

  @ApiProperty()
  @Prop()
  moviesCount: number;

  @ApiProperty({ type: () => ShortImage })
  @Prop({ type: () => ShortImage })
  cover: ShortImage;

  @Prop()
  updatedAt: Date;
  @Prop()
  createdAt: Date;
}
export const ListSchema = SchemaFactory.createForClass(List);
