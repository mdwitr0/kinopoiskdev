import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
  @ApiProperty()
  @Prop({ required: true, unique: true, index: true })
  id: number;

  @ApiProperty()
  @Prop()
  title: string;

  @ApiPropertyOptional()
  @Prop({ enum: StudioType })
  type: StudioType;

  @ApiPropertyOptional({ type: () => MovieFromStudio })
  @Prop()
  movies: MovieFromStudio;
}

export const StudioSchema = SchemaFactory.createForClass(Studio);
