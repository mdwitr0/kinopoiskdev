import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

// INFO: Objects

export class ExternalId {
  @Prop({ index: true })
  kpHD: string;

  @Prop({ index: true })
  imdb: string;

  @Prop({ index: true })
  tmdb: number;
}

export class Rating {
  @Prop({ unique: true })
  kpHD: string;

  @Prop({ unique: true })
  imdb: string;

  @Prop()
  tmdb: number;
}

export class VendorNumbers {
  @Prop({ index: true })
  kp: number;

  @Prop({ index: true })
  imdb: number;

  @Prop({ index: true })
  tmdb: number;

  @Prop({ index: true })
  filmCritics: number;

  @Prop({ index: true })
  russianFilmCritics: number;

  @Prop({ index: true })
  await: number;
}

export class Logo {
  @Prop()
  url: string;
}

export class Image {
  @Prop()
  url: string;

  @Prop()
  previewUrl: string;
}

export class VendorImage {
  @Prop({ index: true })
  name: string;

  @Prop()
  url: string;

  @Prop()
  previewUrl: string;
}

export class Name {
  @Prop({ index: true })
  name: string;
}

export class Video {
  @Prop()
  url: string;

  @Prop()
  name: string;

  @Prop()
  site: string;

  @Prop()
  size: number;

  @Prop()
  type: string;
}

export class VideoTypes {
  @Prop({ type: () => [Video] })
  trailers: Video[];

  @Prop({ type: () => [Video] })
  teasers: Video[];
}

export class Person {
  @Prop({ index: true })
  id: number;

  @Prop()
  photo: string;

  @Prop()
  name: string;

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
  @Prop({ index: true })
  value: number;

  @Prop()
  currency: string;
}

export class Fees {
  @Prop()
  world: CurrencyValue;

  @Prop()
  russia: CurrencyValue;

  @Prop()
  usa: CurrencyValue;
}

export class Distributor {
  @Prop()
  distributor: string;

  @Prop()
  distributorRelease: string;
}

export class Premiere {
  @Prop()
  country: string;

  @Prop({ index: true })
  world: Date;

  @Prop({ index: true })
  russia: Date;

  @Prop({ index: true })
  digital: Date;

  @Prop()
  cinema: Date;

  @Prop()
  bluray: Date;

  @Prop()
  dvd: Date;
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

export class Value {
  @Prop()
  value: string;
}

export class Fact {
  @Prop()
  value: string;
  @Prop()
  type: string;
  @Prop()
  spoiler: boolean;
}

export class ReviewInfo {
  @Prop()
  count: number;

  @Prop()
  positiveCount: number;

  @Prop()
  percentage: string;
}

export class SeasonInfo {
  @Prop()
  number: number;

  @Prop()
  episodesCount: number;
}

export class Collection {
  @Prop({ refPath: 'Collection' })
  type: Types.ObjectId;
}

export class LinkedMovie {
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
  poster: Image;
}

export class Watchability {
  @Prop({ type: () => [WatchabilityItem] })
  items: WatchabilityItem[];
}

export class WatchabilityItem {
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
  @Prop()
  start: number;

  @Prop()
  end: number;
}

// INFO:Movie model
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
export class MovieModel extends Document {
  // INFO: Id values
  @Prop({ unique: true })
  id: number;

  @Prop({ index: true })
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
  @Prop()
  description: string;

  @Prop()
  shortDescription: string;

  @Prop()
  slogan: string;

  // FIXME: null from uno
  @Prop({ index: true })
  status: string;

  @Prop({ type: () => [Fact] })
  facts: Fact[];

  // INFO: Movie rating values
  @Prop()
  rating: VendorNumbers;

  @Prop()
  votes: VendorNumbers;

  // INFO: Length value
  @Prop()
  movieLength: number;

  // INFO: Age rating values
  @Prop()
  ratingMpaa: string;

  @Prop()
  ageRating: number;

  // INFO: Image values
  @Prop()
  logo: Logo;

  @Prop()
  poster: Image;

  @Prop()
  horizontalPoster: Image;

  @Prop()
  backdrop: Image;

  @Prop()
  imagesInfo: Images;

  // INFO: Vadeo value
  @Prop()
  videos: VideoTypes;

  // INFO: Movie base values
  @Prop({ type: () => [Name] })
  genres: Name[];

  @Prop({ type: () => [Name] })
  countries: Name[];

  @Prop({ type: () => [Person] })
  persons: Person[];

  @Prop()
  color: string;

  @Prop()
  networks: VendorImage;

  @Prop()
  distributors: Distributor;

  @Prop({ type: () => [SpokenLanguages] })
  spokenLanguages: SpokenLanguages[];

  @Prop()
  reviewInfo: ReviewInfo;

  @Prop({ type: () => [SeasonInfo] })
  seasonsInfo: SeasonInfo[];

  @Prop({ type: () => [Collection] })
  collections: Collection[];

  @Prop({ type: () => [VendorImage] })
  productionCompanies: VendorImage[];

  // INFO: Currency values
  @Prop()
  budget: CurrencyValue;

  @Prop()
  fees: Fees;

  // INFO: Date values
  @Prop()
  premiere: Premiere;

  @Prop()
  ticketsOnSale: boolean;

  @Prop()
  technology: Technology;

  @Prop({ type: () => [LinkedMovie] })
  similarMovies: LinkedMovie[];

  @Prop({ type: () => [LinkedMovie] })
  sequelsAndPrequels: LinkedMovie[];

  @Prop({ type: () => Watchability })
  watchability: Watchability;

  @Prop({ type: () => [YearRange] })
  releaseYears: YearRange[];

  @Prop()
  top10: number;

  @Prop()
  top250: number;
}
export const MovieSchema = SchemaFactory.createForClass(Person);
MovieSchema.plugin(mongoosePaginate);
