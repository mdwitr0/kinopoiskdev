import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApiNullableProperty } from '../../common/decorators/api-nullable-property.decorator';

// INFO: Objects

export class ExternalId {
  @ApiNullableProperty({
    description: 'ID из kinopoisk HD',
    example: '48e8d0acb0f62d8585101798eaeceec5',
  })
  @Prop({ index: true })
  kpHD?: string;

  @ApiNullableProperty({ example: 'tt0232500' })
  @Prop({ index: true })
  imdb?: string;

  @ApiNullableProperty({ example: 9799 })
  @Prop({ index: true })
  tmdb?: number;
}

export class Votes {
  @ApiNullableProperty({ example: 60000 })
  @Prop({ index: true })
  kp: string;

  @ApiNullableProperty({ example: 50000 })
  @Prop({ index: true })
  imdb: number;

  @ApiNullableProperty({ example: 10000 })
  @Prop({ index: true })
  tmdb: number;

  @ApiNullableProperty({ example: 10000, description: 'Количество голосов кинокритиков' })
  @Prop({ index: true })
  filmCritics: number;

  @ApiNullableProperty({ example: 4000, description: 'Количество голосов кинокритиков из РФ' })
  @Prop({ index: true })
  russianFilmCritics: number;

  @ApiNullableProperty({ example: 34000, description: 'Количество ожидающих выхода' })
  @Prop({ index: true })
  await: number;
}

export class Rating {
  @ApiNullableProperty({ example: 6.2, description: 'Рейтинг кинопоиска' })
  @Prop({ index: true })
  kp: number;

  @ApiNullableProperty({ example: 8.4, description: 'Рейтинг IMDB' })
  @Prop({ index: true })
  imdb: number;

  @ApiNullableProperty({ example: 3.2, description: 'Рейтинг TMDB' })
  @Prop({ index: true })
  tmdb: number;

  @ApiNullableProperty({ example: 10, description: 'Рейтинг кинокритиков' })
  @Prop({ index: true })
  filmCritics: number;

  @ApiNullableProperty({ example: 5.1, description: 'Рейтинг кинокритиков из РФ' })
  @Prop({ index: true })
  russianFilmCritics: number;

  @ApiNullableProperty({ example: 6.1, description: 'Рейтинг основанный на ожиданиях пользователей' })
  @Prop({ index: true })
  await: number;
}

export class Logo {
  @ApiNullableProperty({ description: 'Чтобы найти фильмы с этим полем, используйте: `!null`' })
  @Prop()
  url: string;
}

export class ShortImage {
  @ApiNullableProperty({ description: 'Чтобы найти фильмы с этим полем, используйте: `!null`' })
  @Prop()
  url: string;

  @ApiNullableProperty({ description: 'Чтобы найти фильмы с этим полем, используйте: `!null`' })
  @Prop()
  previewUrl: string;
}

export class VendorImage {
  @ApiNullableProperty()
  @Prop({ index: true })
  name: string;

  @ApiNullableProperty()
  @Prop()
  url: string;

  @ApiNullableProperty()
  @Prop()
  previewUrl: string;
}

export class Name {
  @ApiPropertyOptional()
  @Prop({ index: true })
  name: string;

  @Prop()
  language?: string | null;

  @Prop()
  type?: string | null;
}

export class ItemName {
  @ApiPropertyOptional()
  @Prop({ index: true })
  name: string;
}

export class Video {
  @ApiNullableProperty({ example: 'https://www.youtube.com/embed/ZsJz2TJAPjw', description: 'Url трейлера' })
  @Prop()
  url: string;

  @ApiNullableProperty({ example: 'Official Trailer' })
  @Prop()
  name: string;

  @ApiNullableProperty({ example: 'youtube' })
  @Prop()
  site: string;

  @ApiNullableProperty()
  @Prop()
  size: number;

  @ApiNullableProperty({ example: 'TRAILER' })
  @Prop()
  type: string;
}

export class VideoTypes {
  @ApiNullableProperty({ type: () => Video, isArray: true })
  @Prop({ type: () => [Video] })
  trailers: Video[];

  @ApiHideProperty()
  @Prop({ type: () => [Video] })
  teasers: Video[];
}

export class PersonInMovie {
  @ApiProperty({ example: 6317, description: 'Id персоны с кинопоиска' })
  @Prop({ index: true })
  id: number;

  @ApiNullableProperty({ example: 'https://st.kp.yandex.net/images/actor_iphone/iphone360_6317.jpg' })
  @Prop()
  photo: string;

  @ApiNullableProperty({ example: 'Пол Уокер' })
  @Prop()
  name: string;

  @ApiNullableProperty({ example: 'Paul Walker' })
  @Prop()
  enName: string;

  @ApiNullableProperty()
  @Prop()
  description: string;

  @ApiNullableProperty()
  @Prop()
  profession: string;

  @ApiNullableProperty()
  @Prop()
  enProfession: string;
}

export class CurrencyValue {
  @ApiNullableProperty({ example: 207283, description: 'Сумма' })
  @Prop({ index: true })
  value: number;

  @ApiNullableProperty({ example: '€', description: 'Валюта' })
  @Prop()
  currency: string;
}

export class Fees {
  @ApiPropertyOptional({ type: () => CurrencyValue })
  @Prop({ type: () => CurrencyValue })
  world: CurrencyValue;

  @ApiPropertyOptional({ type: () => CurrencyValue })
  @Prop({ type: () => CurrencyValue })
  russia: CurrencyValue;

  @ApiPropertyOptional({ type: () => CurrencyValue })
  @Prop({ type: () => CurrencyValue })
  usa: CurrencyValue;
}

export class Distributor {
  @Prop()
  distributor: string;

  @Prop()
  distributorRelease: string;
}

export class Premiere {
  @ApiNullableProperty({ example: 'США' })
  @Prop()
  country: string;

  @ApiNullableProperty({
    example: '2023-02-25T02:44:39.359Z',
    description: 'Для более релевантного поиска, используйте интервал дат 01.02.2022-01.02.2023',
    type: Date,
  })
  @Prop({ type: () => Date, index: true })
  world: string;

  @ApiNullableProperty({
    example: '2023-02-25T02:44:39.359Z',
    description: 'Для более релевантного поиска, используйте интервал дат 01.02.2022-01.02.2023',
    type: Date,
  })
  @Prop({ type: () => Date, index: true })
  russia: string;

  @ApiNullableProperty()
  @Prop({ type: () => Date, index: true })
  digital: string;

  @ApiNullableProperty({
    example: '2023-02-25T02:44:39.359Z',
    description: 'Для более релевантного поиска, используйте интервал дат 01.02.2022-01.02.2023',
    type: Date,
  })
  @Prop({ type: () => Date })
  cinema: string;

  @ApiNullableProperty()
  @Prop({ type: () => Date })
  bluray: string;

  @ApiNullableProperty()
  @Prop({ type: () => Date })
  dvd: string;
}

export class SpokenLanguages {
  @Prop()
  name: string;

  @Prop()
  nameEn: string;
}

export class Images {
  @Prop()
  postersCount: number;

  @Prop()
  backdropsCount: number;

  @Prop()
  framesCount: number;
}

export class FactInMovie {
  @ApiProperty()
  @Prop()
  value: string;

  @ApiNullableProperty()
  @Prop()
  type: string;

  @ApiNullableProperty()
  @Prop()
  spoiler: boolean;
}

export class ReviewInfo {
  @ApiNullableProperty()
  @Prop()
  count: number;

  @ApiNullableProperty()
  @Prop()
  positiveCount: number;

  @ApiNullableProperty()
  @Prop()
  percentage: string;
}

export class SeasonInfo {
  @ApiNullableProperty()
  @Prop()
  number: number;

  @ApiNullableProperty()
  @Prop()
  episodesCount: number;
}

export class LinkedMovie {
  @ApiProperty()
  @Prop()
  id: number;

  @ApiNullableProperty()
  @Prop()
  name: string;

  @ApiNullableProperty()
  @Prop()
  enName: string;

  @ApiNullableProperty()
  @Prop()
  alternativeName: string;

  @ApiNullableProperty()
  @Prop()
  type?: string;

  @ApiNullableProperty()
  @Prop()
  poster: ShortImage;

  @ApiNullableProperty()
  @Prop({ type: () => Rating })
  rating: Rating;

  @ApiNullableProperty()
  @Prop({ index: true })
  year: number;
}

export class Watchability {
  @ApiPropertyOptional({ type: () => WatchabilityItem, isArray: true })
  @Prop({ type: () => [WatchabilityItem] })
  items: WatchabilityItem[];
}

export class WatchabilityItem {
  @ApiNullableProperty()
  @Prop()
  name: string;

  @Prop({ type: () => Logo })
  logo: Logo;

  @Prop()
  url: string;
}

export class Technology {
  @Prop()
  hasImax: boolean;

  @Prop()
  has3D: boolean;
}

export class YearRange {
  @ApiNullableProperty({ example: 2022, description: 'Год начала' })
  @Prop()
  start: number;

  @ApiNullableProperty({ example: 2023, description: 'Год окончания' })
  @Prop()
  end: number;
}

export class Audience {
  @ApiNullableProperty({ example: 1000, description: 'Количество просмотров в кино' })
  @Prop()
  count: number;

  @ApiNullableProperty({ example: 'Россия', description: 'Страна в которой проходил показ' })
  @Prop()
  country: string;
}

export class NetworkItem {
  @Prop()
  name: string;

  @Prop({ type: () => Logo })
  logo: Logo;
}
export class Networks {
  @Prop({ type: () => [NetworkItem] })
  items: NetworkItem[];
}

// INFO:Movie model
export type MovieDocument = HydratedDocument<Movie>;
@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  collection: 'movies',
})
export class Movie {
  // INFO: Id values
  @Prop({ unique: true })
  id: number;

  @Prop({ index: true, type: () => ExternalId })
  externalId: ExternalId;

  // INFO: Name values
  @Prop({ index: true })
  name: string;

  @Prop({ index: true })
  alternativeName: string;

  @Prop({ index: true })
  enName: string;

  @Prop({ type: () => [Name] })
  names: Name[];

  // INFO: Type values
  @Prop({ index: true })
  type: string;

  @Prop({ index: true })
  typeNumber: number;

  // INFO: Year values
  @Prop({ index: true })
  year: number;

  // INFO: Description values
  @Prop()
  description: string;

  @Prop()
  shortDescription: string;

  @Prop()
  slogan: string;

  @Prop({ index: true })
  status: string;

  @Prop({ type: () => [FactInMovie] })
  facts: FactInMovie[];

  // INFO: Movie rating values
  @Prop({ type: () => Rating })
  rating: Rating;

  @Prop({ type: () => Votes })
  votes: Votes;

  // INFO: Length value
  @Prop()
  movieLength: number;

  @Prop()
  totalSeriesLength: number;

  @Prop()
  seriesLength: number;

  // INFO: Age rating values
  @Prop()
  ratingMpaa: string;

  @Prop()
  ageRating: number;

  // INFO: Image values
  @Prop({ type: () => Logo })
  logo: Logo;

  @Prop({ type: () => ShortImage })
  poster: ShortImage;

  @Prop({ type: () => ShortImage })
  backdrop: ShortImage;

  @Prop({ type: () => Images })
  imagesInfo: Images;

  // INFO: Video value
  @Prop({ type: () => VideoTypes })
  videos: VideoTypes;

  // INFO: Movie base values
  @Prop({ type: () => [ItemName] })
  genres: ItemName[];

  @Prop({ type: () => [ItemName] })
  countries: ItemName[];

  @Prop({ type: () => [PersonInMovie] })
  persons: PersonInMovie[];

  @Prop({ type: () => ReviewInfo })
  reviewInfo: ReviewInfo;

  @Prop({ type: () => [SeasonInfo] })
  seasonsInfo: SeasonInfo[];

  // INFO: Currency values
  @Prop({ type: () => CurrencyValue })
  budget: CurrencyValue;

  @Prop({ type: () => Fees })
  fees: Fees;

  // INFO: Date values
  @Prop({ type: () => Premiere })
  premiere: Premiere;

  @Prop({ type: () => [LinkedMovie] })
  similarMovies: LinkedMovie[];

  @Prop({ type: () => [LinkedMovie] })
  sequelsAndPrequels: LinkedMovie[];

  @Prop({ type: () => Watchability })
  watchability: Watchability;

  @Prop({ type: () => [VendorImage] })
  productionCompanies: VendorImage[];

  @Prop({ type: () => [YearRange] })
  releaseYears: YearRange[];

  @Prop()
  top10?: number | null;

  @Prop()
  top250?: number | null;

  @Prop()
  isSeries: boolean;

  @Prop({ type: () => [Audience] })
  audience: Audience[];

  @Prop()
  ticketsOnSale: boolean;

  @Prop()
  lists: string[];

  @Prop({ type: () => Networks })
  networks: Networks;

  @Prop()
  updatedAt: Date;
  @Prop()
  createdAt: Date;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
