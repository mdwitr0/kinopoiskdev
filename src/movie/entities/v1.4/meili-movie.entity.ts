import { ExternalId, ItemName, Logo, Movie, Name, Rating, ShortImage, Votes, YearRange } from '../../schemas/movie.schema';
import { MeiliMovieEntity } from '../meili-movie.entity';
import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
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
  @ApiProperty({ type: () => Name, isArray: true })
  @Expose()
  names: Name[];

  @ApiNullableProperty({ type: () => ExternalId })
  @Expose()
  externalId: ExternalId;

  @ApiPropertyOptional({ type: () => Logo })
  @Expose()
  logo: Logo;

  @ApiPropertyOptional({ type: () => ShortImage })
  @Expose()
  poster: ShortImage;

  @ApiPropertyOptional({ type: () => ShortImage })
  @Expose()
  backdrop: ShortImage;

  @ApiPropertyOptional({ type: () => Rating })
  @Expose()
  rating: Rating;

  @ApiPropertyOptional({ type: () => Votes })
  @Expose()
  votes: Votes;

  @ApiPropertyOptional({ type: () => ItemName, isArray: true })
  @Expose()
  genres: ItemName[];

  @ApiPropertyOptional({ type: () => ItemName, isArray: true })
  @Expose()
  countries: ItemName[];

  @ApiPropertyOptional({ type: () => YearRange, isArray: true })
  @Expose()
  releaseYears: YearRange[];

  @ApiProperty()
  @Expose()
  isSeries: boolean;

  @ApiProperty()
  @Expose()
  ticketsOnSale: boolean;

  @ApiProperty()
  @Expose()
  totalSeriesLength: number;

  @ApiProperty()
  @Expose()
  seriesLength: number;

  @ApiProperty()
  @Expose()
  ratingMpaa: string;

  @ApiProperty()
  @Expose()
  ageRating: number;

  @ApiProperty()
  @Expose()
  top10?: number | null;

  @ApiProperty()
  @Expose()
  top250?: number | null;

  @ApiProperty()
  @Expose()
  typeNumber: number;

  @ApiProperty()
  @Expose()
  status: string;

  internalNames: string[];
  internalRating: number;
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
