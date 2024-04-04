import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApiNullableProperty } from 'src/common/decorators/api-nullable-property.decorator';
import { READ_PREFERENCE } from '../../common/configs/mongo.config';

export class BirthPlace {
  @ApiPropertyOptional()
  @Prop()
  value: string;
}

export class DeathPlace {
  @ApiPropertyOptional()
  @Prop()
  value: string;
}

export class Spouses {
  @ApiProperty()
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

export class Profession {
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
  @ApiProperty()
  @Prop({ index: true })
  id: number;

  @ApiNullableProperty()
  @Prop()
  name: string;

  @ApiNullableProperty()
  @Prop()
  alternativeName: string;

  @ApiNullableProperty()
  @Prop()
  rating: number;

  @ApiNullableProperty()
  @Prop()
  general: boolean;

  @ApiNullableProperty()
  @Prop()
  description: string;

  @ApiNullableProperty()
  @Prop()
  enProfession: string;
}

export type PersonDocument = HydratedDocument<Person>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  read: READ_PREFERENCE,
})
export class Person {
  @ApiProperty()
  @Prop({ required: true, unique: true, index: true })
  id: number;

  @ApiNullableProperty()
  @Prop()
  name: string;

  @ApiNullableProperty()
  @Prop()
  enName: string;

  @ApiNullableProperty()
  @Prop()
  photo: string;

  @ApiNullableProperty()
  @Prop({ index: true })
  sex: string;

  @ApiNullableProperty()
  @Prop()
  growth: number;

  @ApiNullableProperty()
  @Prop({ index: true, type: () => Date })
  birthday: string;

  @ApiNullableProperty()
  @Prop({ index: true, type: () => Date })
  death: string;

  @ApiNullableProperty()
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

  @Prop()
  updatedAt: Date;
  @Prop()
  createdAt: Date;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
