import mongoosePaginate from 'mongoose-paginate-v2';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
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

class Fact {
  @ApiPropertyOptional()
  @Prop()
  value: string;
}

class Movie {
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

  @ApiPropertyOptional({ type: () => Fact, isArray: true })
  @Prop({ items: Fact })
  facts: Fact[];

  @ApiPropertyOptional({ type: () => Movie, isArray: true })
  @Prop({ items: Movie })
  movies: Movie[];

  @ApiPropertyOptional()
  @Prop({ default: false })
  isParse: boolean;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
