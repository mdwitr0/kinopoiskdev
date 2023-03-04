import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiPropertyOptional } from '@nestjs/swagger';

class Award {
  @ApiPropertyOptional()
  @Prop()
  title: string;
  @ApiPropertyOptional()
  @Prop()
  year: number;
}

class Nomination {
  @ApiPropertyOptional()
  @Prop()
  award: Award;
  @ApiPropertyOptional()
  @Prop()
  title: string;
}

class Movie {
  @ApiPropertyOptional()
  @Prop()
  id: number;
  @ApiPropertyOptional()
  @Prop()
  name: string;
  @ApiPropertyOptional()
  @Prop()
  type: string;
  @ApiPropertyOptional()
  @Prop()
  rating: number;
  @ApiPropertyOptional()
  @Prop()
  general: boolean;
}

export type PersonAwardDocument = HydratedDocument<PersonAward>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class PersonAward {
  @ApiPropertyOptional()
  @Prop()
  personId: number;
  @ApiPropertyOptional()
  @Prop()
  nomination: Nomination;
  @ApiPropertyOptional({ type: () => Nomination })
  @Prop()
  movie: Movie;
  @ApiPropertyOptional({ type: () => Movie })
  @Prop()
  winning: true;
}

export const PersonAwardSchema = SchemaFactory.createForClass(PersonAward);
