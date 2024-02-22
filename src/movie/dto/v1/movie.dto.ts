import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { ApiNullableProperty } from 'src/common/decorators/api-nullable-property.decorator';
import { ParseNumber } from 'src/common/decorators/transform/parse-number.decorator';
import {
  CurrencyValue,
  ExternalId,
  FactInMovie,
  Fees,
  Images,
  ItemName,
  Logo,
  Name,
  PersonInMovie,
  Premiere,
  Rating,
  ReviewInfo,
  SeasonInfo,
  ShortImage,
  VendorImage,
  VideoTypes,
  Votes,
  Watchability,
  YearRange,
} from 'src/movie/schemas/movie.schema';

export class LinkedMovie {
  @ApiProperty()
  id: number;

  @ApiNullableProperty()
  name: string;

  @ApiNullableProperty()
  enName: string;

  @ApiNullableProperty()
  alternativeName: string;

  @ApiNullableProperty()
  type?: string;

  @ApiNullableProperty()
  poster: ShortImage;
}

export class MovieDtoV1 {
  // INFO: Id values
  @ApiNullableProperty({
    description: 'Id фильма с кинопоиска',
    example: 666,
  })
  @IsOptional()
  @IsNumber()
  @ParseNumber()
  id: number;

  @ApiNullableProperty({ type: () => ExternalId })
  externalId: ExternalId;

  // INFO: Name values
  @ApiNullableProperty({ example: 'Человек паук' })
  name: string;

  @ApiNullableProperty({ example: 'Spider man' })
  alternativeName: string;

  @ApiNullableProperty({ example: 'Spider man' })
  enName: string;

  @ApiNullableProperty({ type: () => Name, isArray: true })
  names: Name[];

  // INFO: Type values
  @ApiNullableProperty({
    example: 'movie',
    description: 'Тип тайтла. Доступны: movie | tv-series | cartoon | anime | animated-series | tv-show',
  })
  type: string;

  @ApiNullableProperty({
    example: 1,
    description:
      'Тип тайтла в числовом обозначении. Доступны: 1 (movie) | 2 (tv-series) | 3 (cartoon) | 4 (anime) | 5 (animated-series) | 6 (tv-show)',
  })
  typeNumber: number;

  // INFO: Year values
  @ApiNullableProperty({
    example: 2023,
    description: 'Год премьеры. При поиске по этому полю, можно использовать интервалы 1860-2030',
  })
  year: number;

  // INFO: Description values
  @ApiNullableProperty({
    description: 'Описание тайтла',
  })
  description: string;

  @ApiNullableProperty({
    description: 'Сокращенное описание',
  })
  shortDescription: string;

  @ApiNullableProperty({
    description: 'Слоган',
  })
  slogan: string;

  @ApiNullableProperty({
    example: 'completed',
    description: 'Статус релиза тайтла. Доступные значения: filming | pre-production | completed | announced | post-production',
  })
  status: string;

  @ApiNullableProperty()
  facts: FactInMovie[];

  // INFO: Movie rating values
  @ApiPropertyOptional({ type: () => Rating })
  rating: Rating;

  @ApiPropertyOptional({ type: () => Votes })
  votes: Votes;

  // INFO: Length value
  @ApiNullableProperty({ example: 120, description: 'Продолжительность фильма' })
  movieLength: number;

  // INFO: Age rating values
  @ApiNullableProperty({
    example: 'pg13',
    description: 'Возрастной рейтинг по MPAA',
  })
  ratingMpaa: string;

  @ApiNullableProperty({
    example: '16',
    description: 'Возрастной рейтинг',
  })
  ageRating: number;

  // INFO: Image values
  @ApiPropertyOptional({ type: () => Logo })
  logo: Logo;

  @ApiPropertyOptional({ type: () => ShortImage })
  poster: ShortImage;

  @ApiPropertyOptional({ type: () => ShortImage })
  backdrop: ShortImage;

  // !TODO: Поле не приходит из парсера, нужно проставить сюда данные
  @ApiHideProperty()
  imagesInfo: Images;

  // INFO: Video value
  @ApiPropertyOptional({ type: () => VideoTypes })
  videos: VideoTypes;

  // INFO: Movie base values
  @ApiPropertyOptional({ type: () => ItemName, isArray: true })
  genres: ItemName[];

  @ApiPropertyOptional({ type: () => ItemName, isArray: true })
  countries: ItemName[];

  @ApiPropertyOptional({ type: () => PersonInMovie, isArray: true })
  persons: PersonInMovie[];

  // !TODO: Поле не приходит из парсера, нужно проставить сюда данные
  @ApiPropertyOptional({ type: () => ReviewInfo })
  reviewInfo: ReviewInfo;

  @ApiPropertyOptional({ type: () => SeasonInfo, isArray: true })
  seasonsInfo: SeasonInfo[];

  // INFO: Currency values
  @ApiPropertyOptional({ type: () => CurrencyValue })
  budget: CurrencyValue;

  @ApiPropertyOptional({ type: () => Fees })
  fees: Fees;

  // INFO: Date values
  @ApiPropertyOptional({ type: () => Premiere })
  premiere: Premiere;

  @ApiPropertyOptional({ type: () => LinkedMovie, isArray: true })
  similarMovies: LinkedMovie[];

  @ApiPropertyOptional({ type: () => LinkedMovie, isArray: true })
  sequelsAndPrequels: LinkedMovie[];

  @ApiPropertyOptional({ type: () => Watchability })
  watchability: Watchability;

  productionCompanies: VendorImage[];

  @ApiPropertyOptional({ type: () => YearRange, isArray: true })
  releaseYears: YearRange[];

  @ApiNullableProperty({
    example: 1,
    description: 'Позиция тайтла в топ 10. Чтобы найти фильмы участвующие в рейтинге используйте: `!null`',
  })
  top10?: number | null;

  @ApiNullableProperty({
    example: 200,
    description: 'Позиция тайтла в топ 250. Чтобы найти фильмы участвующие в рейтинге используйте: `!null`',
  })
  top250?: number | null;
}
