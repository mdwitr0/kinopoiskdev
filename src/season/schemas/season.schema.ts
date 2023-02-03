import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export class Episode {
  @Prop()
  movieId: number;

  @Prop()
  seasonNumber?: number;

  @Prop()
  episodeNumber?: number;

  @Prop()
  name?: string;

  @Prop()
  alternativeName?: string;

  @Prop()
  description?: string;

  @Prop()
  date?: Date;
}

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class SeasonModel extends Document {
  @Prop({ index: true })
  movieId: number;
  @Prop()
  number: number;
  @Prop()
  episodesCount: number;
  @Prop({ type: () => [Episode] })
  episodes: Episode[];
}

const SeasonSchema = SchemaFactory.createForClass(Episode);
SeasonSchema.plugin(mongoosePaginate);
