import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { Award } from 'src/common/models/award.model';

export type PersonAwardDocument = HydratedDocument<MovieAward>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class MovieAward extends Award {
  @ApiProperty()
  @Prop()
  movieId: number;
}

export const MovieAwardSchema = SchemaFactory.createForClass(MovieAward);
