import { ApiProperty } from '@nestjs/swagger';

export class ShortMovieResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  enName: string;

  @ApiProperty()
  alternativeName: string;

  @ApiProperty()
  names: string[];

  @ApiProperty()
  type: string;

  @ApiProperty()
  logo: string;

  @ApiProperty()
  shortDescription: string;

  @ApiProperty()
  horizontalPoster: string;

  @ApiProperty()
  movieLength: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  poster: string;

  @ApiProperty()
  votes: number;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  releaseYears: number[];

  @ApiProperty()
  genres: string[];

  @ApiProperty()
  countries: string[];

  constructor(partial: Partial<ShortMovieResponseDto>) {
    Object.assign(this, partial);
  }
}
