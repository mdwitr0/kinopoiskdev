import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ParseNumber } from '../../common/decorators/transform/parse-number.decorator';
import { IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

// INFO: Objects

export class ExternalId {
  @ApiPropertyOptional({
    description: 'ID из kinopoisk HD',
    example: '48e8d0acb0f62d8585101798eaeceec5',
  })
  @Prop({ index: true })
  kpHD: string;

  @ApiPropertyOptional({ example: 'tt0232500' })
  @Prop({ index: true })
  imdb: string;

  @ApiPropertyOptional({ example: 9799 })
  @Prop({ index: true })
  tmdb: number;
}

export class Votes {
  @ApiPropertyOptional({ example: 60000 })
  @Prop({ index: true })
  kpHD: string;

  @ApiPropertyOptional({ example: 50000 })
  @Prop({ index: true })
  imdb: string;

  @ApiPropertyOptional({ example: 10000 })
  @Prop({ index: true })
  tmdb: number;

  @ApiPropertyOptional({ example: 10000, description: 'Количество голосов кинокритиков' })
  @Prop({ index: true })
  filmCritics: number;

  @ApiPropertyOptional({ example: 4000, description: 'Количество голосов кинокритиков из РФ' })
  @Prop({ index: true })
  russianFilmCritics: number;

  @ApiPropertyOptional({ example: 34000, description: 'Количество ожидающих выхода' })
  @Prop({ index: true })
  await: number;
}

export class Rating {
  @ApiPropertyOptional({ example: 6.2, description: 'Рейтинг кинопоиска' })
  @Prop({ index: true })
  kp: number;

  @ApiPropertyOptional({ example: 8.4, description: 'Рейтинг IMDB' })
  @Prop({ index: true })
  imdb: number;

  @ApiPropertyOptional({ example: 3.2, description: 'Рейтинг TMDB' })
  @Prop({ index: true })
  tmdb: number;

  @ApiPropertyOptional({ example: 10, description: 'Рейтинг кинокритиков' })
  @Prop({ index: true })
  filmCritics: number;

  @ApiPropertyOptional({ example: 5.1, description: 'Рейтинг кинокритиков из РФ' })
  @Prop({ index: true })
  russianFilmCritics: number;

  @ApiPropertyOptional({ example: 6.1, description: 'Рейтинг основанный на ожиданиях пользователей' })
  @Prop({ index: true })
  await: number;
}

export class Logo {
  @ApiPropertyOptional({ description: 'Чтобы найти фильмы с этим полем, используйте: `!null`' })
  @Prop()
  url: string;
}

export class ShortImage {
  @ApiPropertyOptional({ description: 'Чтобы найти фильмы с этим полем, используйте: `!null`' })
  @Prop()
  url: string;

  @ApiPropertyOptional({ description: 'Чтобы найти фильмы с этим полем, используйте: `!null`' })
  @Prop()
  previewUrl: string;
}

export class VendorImage {
  @ApiPropertyOptional()
  @Prop({ index: true })
  name: string;

  @ApiPropertyOptional()
  @Prop()
  url: string;

  @ApiPropertyOptional()
  @Prop()
  previewUrl: string;
}

export class Name {
  @ApiPropertyOptional()
  @Prop({ index: true })
  name: string;
}

export class Video {
  @ApiPropertyOptional({ example: 'https://www.youtube.com/embed/ZsJz2TJAPjw', description: 'Url трейлера' })
  @Prop()
  url: string;

  @ApiPropertyOptional({ example: 'Official Trailer' })
  @Prop()
  name: string;

  @ApiPropertyOptional({ example: 'youtube | yandex' })
  @Prop()
  site: string;

  @Prop()
  size: number;

  @ApiPropertyOptional({ example: 'TRAILER' })
  @Prop()
  type: string;
}

export class VideoTypes {
  @ApiPropertyOptional({ type: () => Video, isArray: true })
  @Prop({ type: () => [Video] })
  trailers: Video[];

  @Prop({ type: () => [Video] })
  teasers: Video[];
}

export class Person {
  @ApiPropertyOptional({ example: 6317, description: 'Id персоны с кинопоиска' })
  @Prop({ index: true })
  id: number;

  @ApiPropertyOptional({ example: 'https://st.kp.yandex.net/images/actor_iphone/iphone360_6317.jpg' })
  @Prop()
  photo: string;

  @ApiPropertyOptional({ example: 'Пол Уокер' })
  @Prop()
  name: string;

  @ApiPropertyOptional({ example: 'Paul Walker' })
  @Prop()
  enName: string;

  @Prop()
  description: string;

  @ApiPropertyOptional({ example: 'actor' })
  @Prop()
  profession: string;

  @Prop()
  enProfession: string;
}

export class CurrencyValue {
  @ApiPropertyOptional({ example: 207283, description: 'Сумма' })
  @Prop({ index: true })
  value: number;

  @ApiPropertyOptional({ example: '€', description: 'Валюта' })
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
  @ApiPropertyOptional()
  @Prop()
  distributor: string;

  @ApiPropertyOptional()
  @Prop()
  distributorRelease: string;
}

export class Premiere {
  @ApiPropertyOptional({ example: 'США' })
  @Prop()
  country: string;

  @ApiPropertyOptional({ example: '01.02.2023', type: Date })
  @Prop({ type: () => Date, index: true })
  world: string;

  @ApiPropertyOptional({ example: '01.02.2023', type: Date })
  @Prop({ type: () => Date, index: true })
  russia: string;

  @ApiPropertyOptional()
  @Prop({ type: () => Date, index: true })
  digital: string;

  @ApiPropertyOptional({ example: '01.02.2023', type: Date })
  @Prop({ type: () => Date })
  cinema: string;

  @ApiPropertyOptional({ example: '01.02.2023', type: Date })
  @Prop({ type: () => Date })
  bluray: string;

  @ApiPropertyOptional({ example: '01.02.2023', type: Date })
  @Prop({ type: () => Date })
  dvd: string;
}

export class SpokenLanguages {
  @ApiPropertyOptional()
  @Prop()
  name: string;

  @ApiPropertyOptional()
  @Prop()
  nameEn: string;
}

export class Images {
  @ApiPropertyOptional()
  @Prop()
  postersCount: number;

  @ApiPropertyOptional()
  @Prop()
  backdropsCount: number;

  @ApiPropertyOptional()
  @Prop()
  framesCount: number;
}

export class Value {
  @ApiPropertyOptional()
  @Prop()
  value: string;
}

export class Fact {
  @ApiPropertyOptional()
  @Prop()
  value: string;
  @ApiPropertyOptional()
  @Prop()
  type: string;
  @ApiPropertyOptional()
  @Prop()
  spoiler: boolean;
}

export class ReviewInfo {
  @ApiPropertyOptional()
  @Prop()
  count: number;

  @ApiPropertyOptional()
  @Prop()
  positiveCount: number;

  @ApiPropertyOptional()
  @Prop()
  percentage: string;
}

export class SeasonInfo {
  @ApiPropertyOptional()
  @Prop()
  number: number;

  @ApiPropertyOptional()
  @Prop()
  episodesCount: number;
}

export class LinkedMovie {
  @ApiPropertyOptional()
  @Prop()
  id: number;

  @ApiPropertyOptional()
  @Prop()
  name: string;

  @ApiPropertyOptional()
  @Prop()
  enName: string;

  @ApiPropertyOptional()
  @Prop()
  alternativeName: string;

  @ApiPropertyOptional()
  @Prop()
  type?: string;

  @ApiPropertyOptional({ type: () => ShortImage })
  @Prop()
  poster: ShortImage;
}

export class Watchability {
  @ApiPropertyOptional({ type: () => WatchabilityItem, isArray: true })
  @Prop({ type: () => [WatchabilityItem] })
  items: WatchabilityItem[];
}

export class WatchabilityItem {
  @ApiPropertyOptional()
  @Prop()
  name: string;

  @ApiPropertyOptional()
  @Prop({ type: () => Logo })
  logo: Logo;

  @ApiPropertyOptional()
  @Prop()
  url: string;
}

export class Technology {
  @ApiPropertyOptional()
  @Prop()
  hasImax: boolean;
  @ApiPropertyOptional()
  @Prop()
  has3D: boolean;
}

export class YearRange {
  @ApiPropertyOptional({ example: 2022, description: 'Год начала' })
  @Prop()
  start: number;

  @ApiPropertyOptional({ example: 2023, description: 'Год окончания' })
  @Prop()
  end: number;
}

// INFO:Movie model
export type MovieDocument = HydratedDocument<Movie>;
@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Movie {
  // INFO: Id values
  @ApiPropertyOptional({
    description: 'Id фильма с кинопоиска',
    example: 666,
  })
  @IsOptional()
  @IsNumber()
  @ParseNumber()
  @Prop({ unique: true })
  id: number;

  @ApiPropertyOptional({ type: () => ExternalId, isArray: true })
  @Prop({ index: true, type: () => ExternalId })
  externalId: ExternalId;

  // INFO: Name values
  @ApiPropertyOptional({ example: 'Человек паук' })
  @Prop({ index: true })
  name: string;

  @ApiPropertyOptional({ example: 'Spider man' })
  @Prop({ index: true })
  alternativeName: string;

  @Prop({ index: true })
  enName: string;

  @ApiPropertyOptional({ type: () => Name, isArray: true })
  @Prop({ type: () => [Name] })
  names: Name[];

  // INFO: Type values
  @ApiPropertyOptional({
    example: 'movie | tv-series | cartoon | anime | animated-series | tv-show',
    description: 'Тип тайтла',
  })
  @Prop({ index: true })
  type: string;

  @ApiPropertyOptional({
    example: '1 (movie) | 2 (tv-series) | 3 (cartoon) | 4 (anime) | 5 (animated-series) | 6 (tv-show)',
    description: 'Тип тайтла в числовом обозначении',
  })
  @Prop({ index: true })
  typeNumber: number;

  @Prop({ index: true })
  subType: string;

  // INFO: Year values
  @ApiPropertyOptional({
    example: '1860-2030',
    description: 'Год премьеры',
  })
  @Prop({ index: true })
  year: number;

  // INFO: Description values
  @ApiPropertyOptional({
    description: 'Описание тайтла',
  })
  @Prop()
  description: string;

  @ApiPropertyOptional({
    description: 'Сокращенное описание',
  })
  @Prop()
  shortDescription: string;

  @ApiPropertyOptional({
    description: 'Слоган',
  })
  @Prop()
  slogan: string;

  @ApiPropertyOptional({
    example: 'filming | pre-production | completed | announced | post-production',
    description: 'Статус релиза тайтла',
  })
  @Prop({ index: true })
  status: string;

  @ApiPropertyOptional({ type: () => Fact, isArray: true })
  @Prop({ type: () => [Fact] })
  facts: Fact[];

  // INFO: Movie rating values
  @ApiPropertyOptional({ type: () => Rating })
  @Prop({ type: () => Rating })
  rating: Rating;

  @ApiPropertyOptional({ type: () => Votes })
  @Prop({ type: () => Votes })
  votes: Votes;

  // INFO: Length value
  @ApiPropertyOptional({ example: 120, description: 'Продолжительность фильма' })
  @Prop()
  movieLength: number;

  // INFO: Age rating values
  @ApiPropertyOptional({
    example: 'pg13',
    description: 'Возрастной рейтинг по MPAA',
  })
  @Prop()
  ratingMpaa: string;

  @ApiPropertyOptional({
    example: '16',
    description: 'Возрастной рейтинг',
  })
  @Prop()
  ageRating: number;

  // INFO: Image values
  @ApiPropertyOptional({ type: () => Logo })
  @Prop({ type: () => Logo })
  logo: Logo;

  @ApiPropertyOptional({ type: () => ShortImage })
  @Prop({ type: () => ShortImage })
  poster: ShortImage;

  @Prop({ type: () => ShortImage })
  horizontalPoster: ShortImage;

  @ApiPropertyOptional({ type: () => ShortImage })
  @Prop({ type: () => ShortImage })
  backdrop: ShortImage;

  @Prop({ type: () => Images })
  imagesInfo: Images;

  // INFO: Vadeo value
  @ApiPropertyOptional({ type: () => VideoTypes })
  @Prop({ type: () => VideoTypes })
  videos: VideoTypes;

  // INFO: Movie base values
  @ApiPropertyOptional({ type: () => Name, isArray: true })
  @Prop({ type: () => [Name] })
  genres: Name[];

  @ApiPropertyOptional({ type: () => Name, isArray: true })
  @Prop({ type: () => [Name] })
  countries: Name[];

  @ApiPropertyOptional({ type: () => Person, isArray: true })
  @Prop({ type: () => [Person] })
  persons: Person[];

  @Prop()
  color: string;

  @ApiPropertyOptional({ type: () => VendorImage })
  @Prop({ type: () => VendorImage })
  networks: VendorImage;

  @ApiPropertyOptional()
  @Prop()
  distributors: Distributor;

  @Prop({ type: () => [SpokenLanguages] })
  spokenLanguages: SpokenLanguages[];

  @ApiPropertyOptional({ type: () => ReviewInfo })
  @Prop({ type: () => ReviewInfo })
  reviewInfo: ReviewInfo;

  @ApiPropertyOptional({ type: () => SeasonInfo, isArray: true })
  @Prop({ type: () => [SeasonInfo] })
  seasonsInfo: SeasonInfo[];

  @ApiPropertyOptional({ type: () => VendorImage, isArray: true })
  @Prop({ type: () => [VendorImage] })
  productionCompanies: VendorImage[];

  // INFO: Currency values
  @ApiPropertyOptional({ type: () => CurrencyValue })
  @Prop({ type: () => CurrencyValue })
  budget: CurrencyValue;

  @ApiPropertyOptional({ type: () => Fees })
  @Prop({ type: () => Fees })
  fees: Fees;

  // INFO: Date values
  @ApiPropertyOptional({ type: () => Premiere })
  @Prop({ type: () => Premiere })
  premiere: Premiere;

  @Prop()
  ticketsOnSale: boolean;

  @ApiPropertyOptional({ type: () => Technology })
  @Prop()
  technology: Technology;

  @ApiPropertyOptional({ type: () => LinkedMovie, isArray: true })
  @Prop({ type: () => [LinkedMovie] })
  similarMovies: LinkedMovie[];

  @ApiPropertyOptional({ type: () => LinkedMovie, isArray: true })
  @Prop({ type: () => [LinkedMovie] })
  sequelsAndPrequels: LinkedMovie[];

  @ApiPropertyOptional()
  @Prop({ type: () => Watchability })
  watchability: Watchability;

  @ApiPropertyOptional({ type: () => YearRange, isArray: true })
  @Prop({ type: () => [YearRange] })
  releaseYears: YearRange[];

  @ApiPropertyOptional({ example: 1, description: 'Позиция тайтла в топ 10' })
  @Prop()
  top10: number;

  @ApiPropertyOptional({ example: 200, description: 'Позиция тайтла в топ 250' })
  @Prop()
  top250: number;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
