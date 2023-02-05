import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document, HydratedDocument } from 'mongoose';
import { ParseNumber } from '../../common/decorators/transform/parse-number.decorator';
import { IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

// INFO: Objects

export class ExternalId {
  @ApiPropertyOptional({
    description: 'ID из kinopoisk HD',
    example: 'gsdfgujsdfgiowe23413',
  })
  @Prop({ index: true })
  kpHD: string;

  @ApiPropertyOptional()
  @Prop({ index: true })
  imdb: string;

  @ApiPropertyOptional()
  @Prop({ index: true })
  tmdb: number;
}

export class Rating {
  @ApiPropertyOptional()
  @Prop({ unique: true })
  kpHD: string;

  @ApiPropertyOptional()
  @Prop({ unique: true })
  imdb: string;

  @ApiPropertyOptional()
  @Prop()
  tmdb: number;
}

export class VendorNumbers {
  @ApiPropertyOptional()
  @Prop({ index: true })
  kp: number;

  @ApiPropertyOptional()
  @Prop({ index: true })
  imdb: number;

  @ApiPropertyOptional()
  @Prop({ index: true })
  tmdb: number;

  @ApiPropertyOptional()
  @Prop({ index: true })
  filmCritics: number;

  @ApiPropertyOptional()
  @Prop({ index: true })
  russianFilmCritics: number;

  @ApiPropertyOptional()
  @Prop({ index: true })
  await: number;
}

export class Logo {
  @ApiPropertyOptional()
  @Prop()
  url: string;
}

export class ShortImage {
  @ApiPropertyOptional()
  @Prop()
  url: string;

  @ApiPropertyOptional()
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
  @ApiPropertyOptional()
  @Prop()
  url: string;

  @ApiPropertyOptional()
  @Prop()
  name: string;

  @ApiPropertyOptional()
  @Prop()
  site: string;

  @ApiPropertyOptional()
  @Prop()
  size: number;

  @ApiPropertyOptional()
  @Prop()
  type: string;
}

export class VideoTypes {
  @ApiPropertyOptional({ type: () => Video, isArray: true })
  @Prop({ type: () => [Video] })
  trailers: Video[];

  @ApiPropertyOptional({ type: () => Video, isArray: true })
  @Prop({ type: () => [Video] })
  teasers: Video[];
}

export class Person {
  @ApiPropertyOptional()
  @Prop({ index: true })
  id: number;

  @ApiPropertyOptional()
  @Prop()
  photo: string;

  @ApiPropertyOptional()
  @Prop()
  name: string;

  @ApiPropertyOptional()
  @Prop()
  enName: string;

  @ApiPropertyOptional()
  @Prop()
  description: string;

  @ApiPropertyOptional()
  @Prop()
  profession: string;

  @ApiPropertyOptional()
  @Prop()
  enProfession: string;
}

export class CurrencyValue {
  @ApiPropertyOptional()
  @Prop({ index: true })
  value: number;

  @ApiPropertyOptional()
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
  @ApiPropertyOptional()
  @Prop()
  country: string;

  @ApiPropertyOptional()
  @Prop({ type: () => Date, index: true })
  world: string;

  @ApiPropertyOptional()
  @Prop({ type: () => Date, index: true })
  russia: string;

  @ApiPropertyOptional()
  @Prop({ type: () => Date, index: true })
  digital: string;

  @ApiPropertyOptional()
  @Prop({ type: () => Date })
  cinema: string;

  @ApiPropertyOptional()
  @Prop({ type: () => Date })
  bluray: string;

  @ApiPropertyOptional()
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
  @ApiPropertyOptional()
  @Prop()
  start: number;

  @ApiPropertyOptional()
  @Prop()
  end: number;
}

// INFO:Movie model
export type MovieDocument = HydratedDocument<Movie>;
@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      if (ret?.__v) delete ret.__v;
      if (ret?._id) delete ret._id;
      if (ret?.externalId?._id) delete ret.externalId._id;
      if (ret?.videos?._id) delete ret.videos._id;
      if (ret?.videos?.trailers)
        ret?.videos?.trailers.forEach((i) => delete i._id);
    },
  },
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
  @ApiPropertyOptional()
  @Prop({ index: true })
  name: string;

  @ApiPropertyOptional()
  @Prop({ index: true })
  alternativeName: string;

  @ApiPropertyOptional()
  @Prop({ index: true })
  enName: string;

  @ApiPropertyOptional({ type: () => Name, isArray: true })
  @Prop({ type: () => [Name] })
  names: Name[];

  // INFO: Type values
  @ApiPropertyOptional()
  @Prop()
  type: string;

  @Prop({ index: true })
  typeNumber: number;

  // FIXME: null from uno
  @Prop({ index: true })
  subType: string;

  // INFO: Year values
  @Prop({ index: true })
  year: number;

  // INFO: Description values
  @ApiPropertyOptional()
  @Prop()
  description: string;

  @ApiPropertyOptional()
  @Prop()
  shortDescription: string;

  @ApiPropertyOptional()
  @Prop()
  slogan: string;

  // FIXME: null from uno
  @Prop({ index: true })
  status: string;

  @ApiPropertyOptional({ type: () => Fact, isArray: true })
  @Prop({ type: () => [Fact] })
  facts: Fact[];

  // INFO: Movie rating values
  @ApiPropertyOptional({ type: () => VendorNumbers })
  @Prop({ type: () => VendorNumbers })
  rating: VendorNumbers;

  @ApiPropertyOptional()
  @Prop()
  votes: VendorNumbers;

  // INFO: Length value
  @ApiPropertyOptional()
  @Prop()
  movieLength: number;

  // INFO: Age rating values
  @ApiPropertyOptional()
  @Prop()
  ratingMpaa: string;

  @ApiPropertyOptional()
  @Prop()
  ageRating: number;

  // INFO: Image values
  @ApiPropertyOptional({ type: () => Logo })
  @Prop({ type: () => Logo })
  logo: Logo;

  @ApiPropertyOptional({ type: () => ShortImage })
  @Prop({ type: () => ShortImage })
  poster: ShortImage;

  @ApiPropertyOptional({ type: () => ShortImage })
  @Prop({ type: () => ShortImage })
  horizontalPoster: ShortImage;

  @ApiPropertyOptional({ type: () => ShortImage })
  @Prop({ type: () => ShortImage })
  backdrop: ShortImage;

  @ApiPropertyOptional({ type: () => Images })
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

  @ApiPropertyOptional()
  @Prop()
  color: string;

  @ApiPropertyOptional({ type: () => VendorImage })
  @Prop({ type: () => VendorImage })
  networks: VendorImage;

  @ApiPropertyOptional()
  @Prop()
  distributors: Distributor;

  @ApiPropertyOptional({ type: () => SpokenLanguages, isArray: true })
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

  @ApiPropertyOptional()
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

  @ApiPropertyOptional()
  @Prop()
  top10: number;

  @ApiPropertyOptional()
  @Prop()
  top250: number;
}

export const MovieSchema = SchemaFactory.createForClass(Person);
