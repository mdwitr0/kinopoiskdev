import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiPropertyOptional } from '@nestjs/swagger';

export enum StudioType {
  'Производство' = 'Производство',
  'Спецэффекты' = 'Спецэффекты',
  'Прокат' = 'Прокат',
  'Студия дубляжа' = 'Студия дубляжа',
}

export class MovieFromStudio {
  @ApiPropertyOptional()
  @Prop()
  id: number;
}

export type StudioDocument = HydratedDocument<Studio>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Studio {
  @ApiPropertyOptional()
  @Prop({ required: true, unique: true, index: true })
  id: number;

  @ApiPropertyOptional()
  @Prop()
  title: string;

  @ApiPropertyOptional()
  @Prop({ enum: StudioType })
  type: StudioType;
}

export const StudioSchema = SchemaFactory.createForClass(Studio);
