import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ShortImage } from '../../movie/schemas/movie.schema';
import { ApiProperty } from '@nestjs/swagger';
import { ApiNullableProperty } from '../../common/decorators/api-nullable-property.decorator';
import { READ_PREFERENCE } from '../../common/configs/mongo.config';

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
  read: READ_PREFERENCE,
})
export class List {
  @ApiNullableProperty()
  @Prop()
  category: string;

  @Prop()
  name: string;

  @ApiNullableProperty()
  @Prop({ unique: true })
  slug: string;

  @ApiNullableProperty()
  @Prop()
  moviesCount: number;

  @ApiNullableProperty({ type: () => ShortImage })
  @Prop({ type: () => ShortImage })
  cover: ShortImage;

  @Prop({ index: true })
  updatedAt: Date;
  @Prop({ index: true })
  createdAt: Date;
}
export const ListSchema = SchemaFactory.createForClass(List);
