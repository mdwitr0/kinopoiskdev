import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

@Schema()
export class Episode {
  @Prop({ required: true, index: true })
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

const EpisodeSchema = SchemaFactory.createForClass(Episode);
EpisodeSchema.plugin(mongoosePaginate);

export default EpisodeSchema;
