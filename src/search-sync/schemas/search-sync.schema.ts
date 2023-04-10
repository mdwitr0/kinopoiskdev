import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SearchSyncDocument = HydratedDocument<SearchSync>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class SearchSync {
  @Prop({ index: true })
  entityType: string;

  @Prop({ default: () => false })
  processing: boolean;

  @Prop({ expires: 60 * 60 * 24, default: () => Date.now() })
  createdAt: Date;
}

export const SearchSyncSchema = SchemaFactory.createForClass(SearchSync);
