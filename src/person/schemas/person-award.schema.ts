import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Award } from 'src/common/models/award.model';
import { ApiNullableProperty } from '../../common/decorators/api-nullable-property.decorator';
import { READ_PREFERENCE } from '../../common/configs/mongo.config';

class Movie {
  @ApiProperty()
  @Prop()
  id: number;

  @ApiNullableProperty()
  @Prop()
  name: string;

  @ApiNullableProperty()
  @Prop()
  rating: number;
}

export type PersonAwardDocument = HydratedDocument<PersonAward>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  collection: 'people-award',
})
export class PersonAward extends Award {
  @ApiProperty()
  @Prop()
  personId: number;

  @ApiNullableProperty({ type: () => Movie })
  @Prop()
  movie: Movie;
}

export const PersonAwardSchema = SchemaFactory.createForClass(PersonAward);
