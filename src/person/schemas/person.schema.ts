import mongoosePaginate from 'mongoose-paginate-v2';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

class BirthPlace {
  @Prop()
  value: string;
}

class DeathPlace {
  @Prop()
  value: string;
}

class Spouses {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  divorced: boolean;

  @Prop()
  divorcedReason: string;

  @Prop()
  sex: string;

  @Prop()
  children: number;

  @Prop()
  relation: string;
}

class Profession {
  @Prop()
  value: string;
}

class Fact {
  @Prop()
  value: string;
}

class Movie {
  @Prop({ index: true })
  id: number;

  @Prop()
  name: string;

  @Prop()
  alternativeName: string;

  @Prop()
  rating: number;

  @Prop()
  General: boolean;

  @Prop()
  description: string;

  @Prop()
  enProfession: string;
}

@Schema()
class Person {
  @Prop({ required: true, unique: true, index: true })
  id: number;

  @Prop()
  name: string;

  @Prop()
  enName: string;

  @Prop()
  photo: string;

  @Prop({ index: true })
  sex: string;

  @Prop()
  growth: number;

  @Prop({ index: true })
  birthday: Date;

  @Prop({ index: true })
  death: Date;

  @Prop({ index: true })
  age: number;

  @Prop({ items: BirthPlace })
  birthPlace: BirthPlace[];

  @Prop({ items: DeathPlace })
  deathPlace: DeathPlace[];

  @Prop()
  spouses: Spouses;

  @Prop()
  countAwards: number;

  @Prop({ items: Profession })
  profession: Profession[];

  @Prop({ items: Fact })
  facts: Fact[];

  @Prop({ items: Movie })
  movies: Movie[];

  @Prop({ default: false })
  isParse: boolean;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
PersonSchema.plugin(mongoosePaginate);
