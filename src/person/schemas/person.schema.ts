import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiPropertyOptional } from '@nestjs/swagger';

class BirthPlace {
  @ApiPropertyOptional()
  @Prop()
  value: string;
}

class DeathPlace {
  @ApiPropertyOptional()
  @Prop()
  value: string;
}

class Spouses {
  @ApiPropertyOptional()
  @Prop()
  id: number;

  @ApiPropertyOptional()
  @Prop()
  name: string;

  @ApiPropertyOptional()
  @Prop()
  divorced: boolean;

  @ApiPropertyOptional()
  @Prop()
  divorcedReason: string;

  @ApiPropertyOptional()
  @Prop()
  sex: string;

  @ApiPropertyOptional()
  @Prop()
  children: number;

  @ApiPropertyOptional()
  @Prop()
  relation: string;
}

class Profession {
  @ApiPropertyOptional()
  @Prop()
  value: string;
}

class FactInPerson {
  @ApiPropertyOptional()
  @Prop()
  value: string;
}

class MovieInPerson {
  @ApiPropertyOptional()
  @Prop({ index: true })
  id: number;

  @ApiPropertyOptional()
  @Prop()
  name: string;

  @ApiPropertyOptional()
  @Prop()
  alternativeName: string;

  @ApiPropertyOptional()
  @Prop()
  rating: number;

  @ApiPropertyOptional()
  @Prop()
  General: boolean;

  @ApiPropertyOptional()
  @Prop()
  description: string;

  @ApiPropertyOptional()
  @Prop()
  enProfession: string;
}

export type PersonDocument = HydratedDocument<Person>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Person {
  @ApiPropertyOptional()
  @Prop({ required: true, unique: true, index: true })
  id: number;

  @ApiPropertyOptional()
  @Prop()
  name: string;

  @ApiPropertyOptional()
  @Prop()
  enName: string;

  @ApiPropertyOptional()
  @Prop()
  photo: string;

  @ApiPropertyOptional()
  @Prop({ index: true })
  sex: string;

  @ApiPropertyOptional()
  @Prop()
  growth: number;

  @ApiPropertyOptional()
  @Prop({ index: true, type: () => Date })
  birthday: string;

  @ApiPropertyOptional()
  @Prop({ index: true, type: () => Date })
  death: string;

  @ApiPropertyOptional()
  @Prop({ index: true })
  age: number;

  @ApiPropertyOptional({ type: () => BirthPlace, isArray: true })
  @Prop({ items: BirthPlace })
  birthPlace: BirthPlace[];

  @ApiPropertyOptional({ type: () => DeathPlace, isArray: true })
  @Prop({ items: DeathPlace })
  deathPlace: DeathPlace[];

  @ApiPropertyOptional({ type: () => Spouses })
  @Prop()
  spouses: Spouses;

  @ApiPropertyOptional()
  @Prop()
  countAwards: number;

  @ApiPropertyOptional({ type: () => Profession, isArray: true })
  @Prop({ items: Profession })
  profession: Profession[];

  @ApiPropertyOptional({ type: () => FactInPerson, isArray: true })
  @Prop({ items: FactInPerson })
  facts: FactInPerson[];

  @ApiPropertyOptional({ type: () => MovieInPerson, isArray: true })
  @Prop({ items: MovieInPerson })
  movies: MovieInPerson[];

  @ApiPropertyOptional()
  @Prop({ default: false })
  isParse: boolean;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
