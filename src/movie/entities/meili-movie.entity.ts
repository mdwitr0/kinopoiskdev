import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Movie } from '../schemas/movie.schema';

export class MeiliMovieEntity {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  alternativeName: string;

  @ApiProperty()
  @Expose()
  enName: string;

  @ApiProperty()
  @Expose()
  names: string[];

  @ApiProperty()
  @Expose()
  type: string;

  @ApiProperty()
  @Expose()
  year: number;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  shortDescription: string;

  @ApiProperty()
  @Expose()
  logo: string;

  @ApiProperty()
  @Expose()
  poster: string;

  @ApiProperty()
  @Expose()
  backdrop: string;

  @ApiProperty()
  @Expose()
  rating: number;

  @ApiProperty()
  @Expose()
  votes: number;

  @ApiProperty()
  @Expose()
  movieLength: number;

  @ApiProperty()
  @Expose()
  genres: string[];

  @ApiProperty()
  @Expose()
  countries: string[];

  @ApiProperty()
  @Expose()
  releaseYears: number[];

  @Expose()
  isSeries: boolean;

  @Expose()
  ticketsOnSale: boolean;

  @Expose()
  totalSeriesLength: number;

  @Expose()
  seriesLength: number;

  @Expose()
  ratingMpaa: string;

  @Expose()
  ageRating: number;

  @Expose()
  top10?: number | null;

  @Expose()
  top250?: number | null;

  @Expose()
  typeNumber: number;

  @Expose()
  status: string;

  constructor(movie: Partial<MeiliMovieEntity>) {
    Object.assign(this, movie);
  }

  public fromMongoDocument(movie: Movie): this {
    this.id = movie.id;
    this.name = movie.name || '';
    this.alternativeName = movie.alternativeName || '';
    this.enName = movie.enName || '';
    this.names = movie.names ? movie.names.map(({ name }) => name) : [];
    this.type = movie.type || '';
    this.year = movie.year || 0;
    this.description = movie.description || '';
    this.shortDescription = movie.shortDescription || '';
    this.logo = movie.logo?.url || null;
    this.poster = movie.poster?.url || null;
    this.backdrop = movie.backdrop?.url || null;
    this.rating = movie.rating.kp || movie.rating.imdb || 0;
    this.votes = Number(movie.votes.kp) || Number(movie.votes.imdb) || 0;
    this.movieLength = movie.movieLength || 0;
    this.genres = movie.genres ? movie.genres.map(({ name }) => name) : [];
    this.countries = movie.countries ? movie.countries.map(({ name }) => name) : [];
    this.releaseYears = movie.releaseYears
      ? movie.releaseYears.map((yearRange) => [yearRange.start, yearRange.end]).flat(1)
      : [];
    this.isSeries = movie.isSeries;
    this.ticketsOnSale = movie.ticketsOnSale;
    this.totalSeriesLength = movie.totalSeriesLength;
    this.seriesLength = movie.seriesLength;
    this.ratingMpaa = movie.ratingMpaa;
    this.ageRating = movie.ageRating;
    this.top10 = movie.top10;
    this.top250 = movie.top250;
    this.typeNumber = movie.typeNumber;
    this.status = movie.status;

    return this;
  }
}
