import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { Award } from 'src/common/models/award.model';
import { ApiNullableProperty } from '../../common/decorators/api-nullable-property.decorator';

export type MovieAwardDocument = HydratedDocument<MovieAward>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  collection: 'movies-award',
})
export class MovieAward extends Award {
  @ApiNullableProperty()
  @Prop()
  movieId: number;
}

export const MovieAwardSchema = SchemaFactory.createForClass(MovieAward);
