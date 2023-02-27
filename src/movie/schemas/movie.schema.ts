import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ParseNumber } from '../../common/decorators/transform/parse-number.decorator';
import { IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiNullablePropery } from '../../common/decorators/api-nullble-property.decorator';

// INFO: Objects

export class ExternalId {
  @ApiNullablePropery({
    description: 'ID из kinopoisk HD',
    example: '48e8d0acb0f62d8585101798eaeceec5',
  })
  @Prop({ index: true })
  kpHD?: string;

  @ApiNullablePropery({ example: 'tt0232500' })
  @Prop({ index: true })
  imdb?: string;

  @ApiNullablePropery({ example: 9799 })
  @Prop({ index: true })
  tmdb?: number;
}

export class Votes {
  @ApiNullablePropery({ example: 60000 })
  @Prop({ index: true })
  kp: string;

  @ApiNullablePropery({ example: 50000 })
  @Prop({ index: true })
  imdb: string;

  @ApiNullablePropery({ example: 10000 })
  @Prop({ index: true })
  tmdb: number;

  @ApiNullablePropery({ example: 10000, description: 'Количество голосов кинокритиков' })
  @Prop({ index: true })
  filmCritics: number;

  @ApiNullablePropery({ example: 4000, description: 'Количество голосов кинокритиков из РФ' })
  @Prop({ index: true })
  russianFilmCritics: number;

  @ApiNullablePropery({ example: 34000, description: 'Количество ожидающих выхода' })
  @Prop({ index: true })
  await: number;
}

export class Rating {
  @ApiNullablePropery({ example: 6.2, description: 'Рейтинг кинопоиска' })
  @Prop({ index: true })
  kp: number;

  @ApiNullablePropery({ example: 8.4, description: 'Рейтинг IMDB' })
  @Prop({ index: true })
  imdb: number;

  @ApiNullablePropery({ example: 3.2, description: 'Рейтинг TMDB' })
  @Prop({ index: true })
  tmdb: number;

  @ApiNullablePropery({ example: 10, description: 'Рейтинг кинокритиков' })
  @Prop({ index: true })
  filmCritics: number;

  @ApiNullablePropery({ example: 5.1, description: 'Рейтинг кинокритиков из РФ' })
  @Prop({ index: true })
  russianFilmCritics: number;

  @ApiNullablePropery({ example: 6.1, description: 'Рейтинг основанный на ожиданиях пользователей' })
  @Prop({ index: true })
  await: number;
}

export class Logo {
  @ApiNullablePropery({ description: 'Чтобы найти фильмы с этим полем, используйте: `!null`' })
  @Prop()
  url: string;
}

export class ShortImage {
  @ApiNullablePropery({ description: 'Чтобы найти фильмы с этим полем, используйте: `!null`' })
  @Prop()
  url: string;

  @ApiNullablePropery({ description: 'Чтобы найти фильмы с этим полем, используйте: `!null`' })
  @Prop()
  previewUrl: string;
}

export class VendorImage {
  @ApiNullablePropery()
  @Prop({ index: true })
  name: string;

  @ApiNullablePropery()
  @Prop()
  url: string;

  @ApiNullablePropery()
  @Prop()
  previewUrl: string;
}

export class Name {
  @ApiNullablePropery()
  @Prop({ index: true })
  name: string;
}

export class Video {
  @ApiNullablePropery({ example: 'https://www.youtube.com/embed/ZsJz2TJAPjw', description: 'Url трейлера' })
  @Prop()
  url: string;

  @ApiNullablePropery({ example: 'Official Trailer' })
  @Prop()
  name: string;

  @ApiNullablePropery({ example: 'youtube' })
  @Prop()
  site: string;

  @Prop()
  size: number;

  @ApiNullablePropery({ example: 'TRAILER' })
  @Prop()
  type: string;
}

export class VideoTypes {
  @ApiNullablePropery({ type: () => Video, isArray: true })
  @Prop({ type: () => [Video] })
  trailers: Video[];

  @Prop({ type: () => [Video] })
  teasers: Video[];
}

export class PersonInMovie {
  @ApiNullablePropery({ example: 6317, description: 'Id персоны с кинопоиска' })
  @Prop({ index: true })
  id: number;

  @ApiNullablePropery({ example: 'https://st.kp.yandex.net/images/actor_iphone/iphone360_6317.jpg' })
  @Prop()
  photo: string;

  @ApiNullablePropery({ example: 'Пол Уокер' })
  @Prop()
  name: string;

  @ApiNullablePropery({ example: 'Paul Walker' })
  @Prop()
  enName: string;

  @Prop()
  description: string;

  @Prop()
  profession: string;

  @Prop()
  enProfession: string;
}

export class CurrencyValue {
  @ApiNullablePropery({ example: 207283, description: 'Сумма' })
  @Prop({ index: true })
  value: number;

  @ApiNullablePropery({ example: '€', description: 'Валюта' })
  @Prop()
  currency: string;
}

export class Fees {
  @ApiNullablePropery({ type: () => CurrencyValue })
  @Prop({ type: () => CurrencyValue })
  world: CurrencyValue;

  @ApiNullablePropery({ type: () => CurrencyValue })
  @Prop({ type: () => CurrencyValue })
  russia: CurrencyValue;

  @ApiNullablePropery({ type: () => CurrencyValue })
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
  @ApiNullablePropery({ example: 'США' })
  @Prop()
  country: string;

  @ApiNullablePropery({
    example: '2023-02-25T02:44:39.359Z',
    description: 'Для более релевантного поиска, используйте интервал дат 01.02.2022-01.02.2023',
    type: Date,
  })
  @Prop({ type: () => Date, index: true })
  world: string;

  @ApiNullablePropery({
    example: '2023-02-25T02:44:39.359Z',
    description: 'Для более релевантного поиска, используйте интервал дат 01.02.2022-01.02.2023',
    type: Date,
  })
  @Prop({ type: () => Date, index: true })
  russia: string;

  @ApiNullablePropery()
  @Prop({ type: () => Date, index: true })
  digital: string;

  @ApiNullablePropery({
    example: '2023-02-25T02:44:39.359Z',
    description: 'Для более релевантного поиска, используйте интервал дат 01.02.2022-01.02.2023',
    type: Date,
  })
  @Prop({ type: () => Date })
  cinema: string;

  @Prop({ type: () => Date })
  bluray: string;

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
  @Prop()
  value: string;

  @Prop()
  type: string;

  @Prop()
  spoiler: boolean;
}

export class ReviewInfo {
  @ApiNullablePropery()
  @Prop()
  count: number;

  @ApiNullablePropery()
  @Prop()
  positiveCount: number;

  @ApiNullablePropery()
  @Prop()
  percentage: string;
}

export class SeasonInfo {
  @ApiNullablePropery()
  @Prop()
  number: number;

  @ApiNullablePropery()
  @Prop()
  episodesCount: number;
}

export class LinkedMovie {
  @ApiNullablePropery()
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  enName: string;

  @Prop()
  alternativeName: string;

  @Prop()
  type?: string;

  @Prop()
  poster: ShortImage;
}

export class Watchability {
  @ApiNullablePropery({ type: () => WatchabilityItem, isArray: true })
  @Prop({ type: () => [WatchabilityItem] })
  items: WatchabilityItem[];
}

export class WatchabilityItem {
  @ApiNullablePropery()
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
  @ApiNullablePropery({ example: 2022, description: 'Год начала' })
  @Prop()
  start: number;

  @ApiNullablePropery({ example: 2023, description: 'Год окончания' })
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

  @ApiPropertyOptional({ type: () => ExternalId })
  @Prop({ index: true, type: () => ExternalId })
  externalId: ExternalId;

  // INFO: Name values
  @ApiNullablePropery({ example: 'Человек паук' })
  @Prop({ index: true })
  name: string;

  @ApiNullablePropery({ example: 'Spider man' })
  @Prop({ index: true })
  alternativeName: string;

  @Prop({ index: true })
  enName: string;

  @ApiPropertyOptional({ type: () => Name, isArray: true })
  @Prop({ type: () => [Name] })
  names: Name[];

  // INFO: Type values
  @ApiPropertyOptional({
    example: 'movie',
    description: 'Тип тайтла. Доступны: movie | tv-series | cartoon | anime | animated-series | tv-show',
  })
  @Prop({ index: true })
  type: string;

  @ApiPropertyOptional({
    example: 1,
    description:
      'Тип тайтла в числовом обозначении. Доступны: 1 (movie) | 2 (tv-series) | 3 (cartoon) | 4 (anime) | 5 (animated-series) | 6 (tv-show)',
  })
  @Prop({ index: true })
  typeNumber: number;

  // INFO: Year values
  @ApiPropertyOptional({
    example: 2023,
    description: 'Год премьеры. При поиске по этому полю, можно использовать интервалы 1860-2030',
  })
  @Prop({ index: true })
  year: number;

  // INFO: Description values
  @ApiNullablePropery({
    description: 'Описание тайтла',
  })
  @Prop()
  description: string;

  @ApiNullablePropery({
    description: 'Сокращенное описание',
  })
  @Prop()
  shortDescription: string;

  @ApiNullablePropery({
    description: 'Слоган',
  })
  @Prop()
  slogan: string;

  @ApiNullablePropery({
    example: 'completed',
    description:
      'Статус релиза тайтла. Доступные значения: filming | pre-production | completed | announced | post-production',
  })
  @Prop({ index: true })
  status: string;

  @Prop({ type: () => [FactInMovie] })
  facts: FactInMovie[];

  // INFO: Movie rating values
  @ApiNullablePropery({ type: () => Rating })
  @Prop({ type: () => Rating })
  rating: Rating;

  @ApiNullablePropery({ type: () => Votes })
  @Prop({ type: () => Votes })
  votes: Votes;

  // INFO: Length value
  @ApiNullablePropery({ example: 120, description: 'Продолжительность фильма' })
  @Prop()
  movieLength: number;

  // INFO: Age rating values
  @ApiNullablePropery({
    example: 'pg13',
    description: 'Возрастной рейтинг по MPAA',
  })
  @Prop()
  ratingMpaa: string;

  @ApiNullablePropery({
    example: '16',
    description: 'Возрастной рейтинг',
  })
  @Prop()
  ageRating: number;

  // INFO: Image values
  @ApiNullablePropery({ type: () => Logo })
  @Prop({ type: () => Logo })
  logo: Logo;

  @ApiNullablePropery({ type: () => ShortImage })
  @Prop({ type: () => ShortImage })
  poster: ShortImage;

  @ApiNullablePropery({ type: () => ShortImage })
  @Prop({ type: () => ShortImage })
  backdrop: ShortImage;

  // !TODO: Поле не приходит из парсера, нужно проставить сюда данные
  @Prop({ type: () => Images })
  imagesInfo: Images;

  // INFO: Vadeo value
  @ApiNullablePropery({ type: () => VideoTypes })
  @Prop({ type: () => VideoTypes })
  videos: VideoTypes;

  // INFO: Movie base values
  @ApiPropertyOptional({ type: () => Name, isArray: true })
  @Prop({ type: () => [Name] })
  genres: Name[];

  @ApiPropertyOptional({ type: () => Name, isArray: true })
  @Prop({ type: () => [Name] })
  countries: Name[];

  @ApiPropertyOptional({ type: () => PersonInMovie, isArray: true })
  @Prop({ type: () => [PersonInMovie] })
  persons: PersonInMovie[];

  // !TODO: Поле не приходит из парсера, нужно проставить сюда данные
  @ApiNullablePropery({ type: () => ReviewInfo })
  @Prop({ type: () => ReviewInfo })
  reviewInfo: ReviewInfo;

  // !TODO: Поле не приходит из парсера, нужно проставить сюда данные
  @ApiNullablePropery({ type: () => SeasonInfo, isArray: true })
  @Prop({ type: () => [SeasonInfo] })
  seasonsInfo: SeasonInfo[];

  // INFO: Currency values
  @ApiNullablePropery({ type: () => CurrencyValue })
  @Prop({ type: () => CurrencyValue })
  budget: CurrencyValue;

  @ApiNullablePropery({ type: () => Fees })
  @Prop({ type: () => Fees })
  fees: Fees;

  // INFO: Date values
  @ApiNullablePropery({ type: () => Premiere })
  @Prop({ type: () => Premiere })
  premiere: Premiere;

  @ApiNullablePropery({ type: () => LinkedMovie, isArray: true })
  @Prop({ type: () => [LinkedMovie] })
  similarMovies: LinkedMovie[];

  @ApiNullablePropery({ type: () => LinkedMovie, isArray: true })
  @Prop({ type: () => [LinkedMovie] })
  sequelsAndPrequels: LinkedMovie[];

  @ApiNullablePropery({ type: () => Watchability })
  @Prop({ type: () => Watchability })
  watchability: Watchability | null;

  @Prop({ type: () => [VendorImage] })
  productionCompanies: VendorImage[];

  @ApiNullablePropery({ type: () => YearRange, isArray: true })
  @Prop({ type: () => [YearRange] })
  releaseYears: YearRange[];

  @ApiNullablePropery({
    example: 1,
    description: 'Позиция тайтла в топ 10. Чтобы найти фильмы участвующие в рейтинге используйте: `!null`',
  })
  @Prop()
  top10?: number | null;

  @ApiNullablePropery({
    example: 200,
    description: 'Позиция тайтла в топ 250. Чтобы найти фильмы участвующие в рейтинге используйте: `!null`',
  })
  @Prop()
  top250?: number | null;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
