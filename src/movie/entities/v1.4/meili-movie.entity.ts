import { ExternalId, ItemName, Logo, Movie, Name, Rating, ShortImage, Votes, YearRange } from '../../schemas/movie.schema';
import { MeiliMovieEntity } from '../meili-movie.entity';
import { Expose } from 'class-transformer';
import { ApiExcludeEndpoint, ApiHideProperty, OmitType } from '@nestjs/swagger';
import { ApiNullableProperty } from '../../../common/decorators/api-nullable-property.decorator';

export class MeiliMovieEntityV1_4 extends OmitType(MeiliMovieEntity, [
  'names',
  'releaseYears',
  'genres',
  'countries',
  'logo',
  'poster',
  'backdrop',
  'rating',
  'votes',
  'fromMongoDocument',
] as const) {
  @ApiNullableProperty({ type: () => Name, isArray: true })
  @Expose()
  names: Name[];

  @ApiNullableProperty({ type: () => ExternalId })
  @Expose()
  externalId: ExternalId;

  @ApiNullableProperty({ type: () => Logo })
  @Expose()
  logo: Logo;

  @ApiNullableProperty({ type: () => ShortImage })
  @Expose()
  poster: ShortImage;

  @ApiNullableProperty({ type: () => ShortImage })
  @Expose()
  backdrop: ShortImage;

  @ApiNullableProperty({ type: () => Rating })
  @Expose()
  rating: Rating;

  @ApiNullableProperty({ type: () => Votes })
  @Expose()
  votes: Votes;

  @ApiNullableProperty({ type: () => ItemName, isArray: true })
  @Expose()
  genres: ItemName[];

  @ApiNullableProperty({ type: () => ItemName, isArray: true })
  @Expose()
  countries: ItemName[];

  @ApiNullableProperty({ type: () => YearRange, isArray: true })
  @Expose()
  releaseYears: YearRange[];

  @ApiNullableProperty()
  @Expose()
  isSeries: boolean;

  @ApiNullableProperty()
  @Expose()
  ticketsOnSale: boolean;

  @ApiNullableProperty()
  @Expose()
  totalSeriesLength: number;

  @ApiNullableProperty()
  @Expose()
  seriesLength: number;

  @ApiNullableProperty()
  @Expose()
  ratingMpaa: string;

  @ApiNullableProperty()
  @Expose()
  ageRating: number;

  @ApiNullableProperty()
  @Expose()
  top10?: number | null;

  @ApiNullableProperty()
  @Expose()
  top250?: number | null;

  @ApiNullableProperty()
  @Expose()
  typeNumber: number;

  @ApiNullableProperty()
  @Expose()
  status: string;

  @ApiHideProperty()
  internalNames: string[];
  @ApiHideProperty()
  internalRating: number;
  @ApiHideProperty()
  internalVotes: number;

  constructor(movie: Partial<MeiliMovieEntityV1_4>) {
    super();
    Object.assign(this, movie);
  }

  public fromMongoDocument(movie: Movie): this {
    this.id = movie.id;
    this.externalId = movie?.externalId || {};
    this.name = movie.name || '';
    this.alternativeName = movie.alternativeName || '';
    this.enName = movie.enName || '';
    this.names = movie.names || [];
    this.type = movie.type || '';
    this.year = movie.year || 0;
    this.description = movie.description || '';
    this.shortDescription = movie.shortDescription || '';
    this.logo = movie.logo || null;
    this.poster = movie.poster || null;
    this.backdrop = movie.backdrop || null;
    this.rating = movie.rating || null;
    this.votes = movie.votes || null;
    this.movieLength = movie.movieLength || 0;
    this.genres = movie.genres || [];
    this.countries = movie.countries || [];
    this.releaseYears = movie.releaseYears || [];
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

    this.internalNames = movie?.names?.length ? movie.names.map(({ name }) => name) : [];
    this.internalRating = movie.rating?.kp || movie.rating?.imdb || 0;
    this.internalVotes = Number(movie.votes?.kp) || Number(movie.votes?.imdb) || 0;

    return this;
  }
}
