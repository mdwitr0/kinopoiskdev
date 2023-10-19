import { ItemName, Logo, Movie, Name, Rating, ShortImage, Votes, YearRange } from '../../schemas/movie.schema';
import { MeiliMovieEntity } from '../meili-movie.entity';
import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';

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
  names: Name[];

  @ApiPropertyOptional({ type: () => Logo })
  logo: Logo;

  @ApiPropertyOptional({ type: () => ShortImage })
  poster: ShortImage;

  @ApiPropertyOptional({ type: () => ShortImage })
  backdrop: ShortImage;

  @ApiPropertyOptional({ type: () => Rating })
  rating: Rating;

  @ApiPropertyOptional({ type: () => Votes })
  votes: Votes;

  @ApiPropertyOptional({ type: () => ItemName, isArray: true })
  genres: ItemName[];

  @ApiPropertyOptional({ type: () => ItemName, isArray: true })
  countries: ItemName[];

  @ApiPropertyOptional({ type: () => YearRange, isArray: true })
  releaseYears: YearRange[];

  constructor(movie: Partial<MeiliMovieEntityV1_4>) {
    super();
    Object.assign(this, movie);
  }

  public fromMongoDocument(movie: Movie): this {
    this.id = movie.id;
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

    return this;
  }
}
