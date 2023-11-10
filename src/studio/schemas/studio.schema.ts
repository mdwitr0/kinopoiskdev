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
  @Prop({ required: true, index: true })
  id: string;

  @ApiProperty()
  @Prop()
  subType: string;

  @ApiProperty()
  @Prop()
  title: string;

  @ApiPropertyOptional()
  @Prop({ enum: StudioType })
  type: StudioType;

  @ApiPropertyOptional({ type: () => MovieFromStudio })
  @Prop()
  movies: MovieFromStudio;

  @Prop()
  updatedAt: Date;
  @Prop()
  createdAt: Date;
}

export const StudioSchema = SchemaFactory.createForClass(Studio);
