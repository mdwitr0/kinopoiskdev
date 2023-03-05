import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Award } from 'src/common/models/award.model';

class Movie {
  @ApiProperty()
  @Prop()
  id: number;

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  rating: number;
}

export type PersonAwardDocument = HydratedDocument<PersonAward>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class PersonAward extends Award {
  @ApiProperty()
  @Prop()
  personId: number;

  @ApiProperty({ type: () => Movie })
  @Prop()
  movie: Movie;
}

export const PersonAwardSchema = SchemaFactory.createForClass(PersonAward);
