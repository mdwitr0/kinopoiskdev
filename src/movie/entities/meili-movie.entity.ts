import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Movie } from '../schemas/movie.schema';
import { ApiNullableProperty } from '../../common/decorators/api-nullable-property.decorator';

export class MeiliMovieEntity {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiNullableProperty()
  @Expose()
  name: string;

  @ApiNullableProperty()
  @Expose()
  alternativeName: string;

  @ApiNullableProperty()
  @Expose()
  enName: string;

  @ApiNullableProperty()
  @Expose()
  names: string[];

  @ApiNullableProperty()
  @Expose()
  type: string;

  @ApiNullableProperty()
  @Expose()
  year: number;

  @ApiNullableProperty()
  @Expose()
  description: string;

  @ApiNullableProperty()
  @Expose()
  shortDescription: string;

  @ApiNullableProperty()
  @Expose()
  logo: string;

  @ApiNullableProperty()
  @Expose()
  poster: string;

  @ApiNullableProperty()
  @Expose()
  backdrop: string;

  @ApiNullableProperty()
  @Expose()
  rating: number;

  @ApiNullableProperty()
  @Expose()
  votes: number;

  @ApiNullableProperty()
  @Expose()
  movieLength: number;

  @ApiNullableProperty()
  @Expose()
  genres: string[];

  @ApiNullableProperty()
  @Expose()
  countries: string[];

  @ApiNullableProperty()
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
    this.rating = movie.rating?.kp || movie.rating?.imdb || 0;
    this.votes = Number(movie.votes?.kp) || Number(movie.votes?.imdb) || 0;
    this.movieLength = movie.movieLength || 0;
    this.genres = movie.genres ? movie.genres.map(({ name }) => name) : [];
    this.countries = movie.countries ? movie.countries.map(({ name }) => name) : [];
    this.releaseYears = movie.releaseYears ? movie.releaseYears.map((yearRange) => [yearRange.start, yearRange.end]).flat(1) : [];
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
