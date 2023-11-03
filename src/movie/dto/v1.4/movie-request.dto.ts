import { IsNumber, IsOptional, Min, Validate } from 'class-validator';
import { ApiNullableProperty } from '../../../common/decorators/api-nullable-property.decorator';
import { IsNumberParam } from '../../../common/validation/is-number-param';
import { IsValueInRange } from '../../../common/validation/is-value-in-range';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ParseNumber } from '../../../common/decorators/transform/parse-number.decorator';
import { SetDefaultValue } from '../../../common/decorators/transform/set-default-value.decorator';
import { AreArrayLengthsEqual } from '../../../common/validation/are-array-lengths-equal';
import { IsValues } from '../../../common/validation/is-values';
import { ToArray } from '../../../common/decorators/transform/to-array.decorator';
import { IsStartWith } from '../../../common/validation/is-start-with';
import { IsLengthExact } from '../../../common/validation/is-length-exact';
import { IsEnumParam } from '../../../common/validation/is-enum-param';
import { IsBooleanParam } from '../../../common/validation/is-boolean-param';
import { IsDateParam } from '../../../common/validation/is-date-param';
import { NumberParam } from '../../../common/decorators/types/number-param';
import { FilterBuilder } from '../../../common/query-builder/filter-builder';
import { StringParam } from '../../../common/decorators/types/string-param';
import { BooleanParam } from '../../../common/decorators/types/boolean-param';
import { SelectBuilder } from '../../../common/query-builder/select-builder';
import { SortBuilder } from '../../../common/query-builder/sort-builder';
import { PaginationBuilder } from '../../../common/query-builder/pagination-builder';
import { SortOrder } from 'mongoose';
import { Expose } from 'class-transformer';
import { EnumParam } from '../../../common/decorators/types/enum-param';

enum MovieFieldV1_4 {
  'id' = 'id',
  'externalId.imdb' = 'externalId.imdb',
  'externalId.tmdb' = 'externalId.tmdb',
  'externalId.kpHD' = 'externalId.kpHD',
  name = 'name',
  enName = 'enName',
  alternativeName = 'alternativeName',
  'names.name' = 'names.name',
  description = 'description',
  shortDescription = 'shortDescription',
  slogan = 'slogan',
  type = 'type',
  typeNumber = 'typeNumber',
  isSeries = 'isSeries',
  status = 'status',
  year = 'year',
  'releaseYears.start' = 'releaseYears.start',
  'releaseYears.end' = 'releaseYears.end',
  'rating.kp' = 'rating.kp',
  'rating.imdb' = 'rating.imdb',
  'rating.tmdb' = 'rating.tmdb',
  'rating.filmCritics' = 'rating.filmCritics',
  'rating.russianFilmCritics' = 'rating.russianFilmCritics',
  'rating.await' = 'rating.await',
  ratingMpaa = 'ratingMpaa',
  ageRating = 'ageRating',
  'votes.kp' = 'votes.kp',
  'votes.imdb' = 'votes.imdb',
  'votes.tmdb' = 'votes.tmdb',
  'votes.filmCritics' = 'votes.filmCritics',
  'votes.russianFilmCritics' = 'votes.russianFilmCritics',
  'votes.await' = 'votes.await',
  'budget.value' = 'budget.value',
  'budget.currency' = 'budget.currency',
  'audience.count' = 'audience.count',
  'audience.country' = 'audience.country',
  movieLength = 'movieLength',
  totalMovieLength = 'totalMovieLength',
  totalSeriesLength = 'totalSeriesLength',
  'genres.name' = 'genres.name',
  'countries.name' = 'countries.name',
  'poster.url' = 'poster.url',
  'backdrop.url' = 'backdrop.url',
  'logo.url' = 'logo.url',
  'ticketsOnSale' = 'ticketsOnSale',
  'videos.trailers.url' = 'videos.trailers.url',
  'videos.trailers.site' = 'videos.trailers.site',
  'videos.trailers.name' = 'videos.trailers.name',
  'networks.items.name' = 'networks.items.name',
  'networks.items.logo.url' = 'networks.items.logo.url',
  'persons.id' = 'persons.id',
  'persons.name' = 'persons.name',
  'persons.enName' = 'persons.enName',
  'persons.photo' = 'persons.photo',
  'persons.description' = 'persons.description',
  'persons.profession' = 'persons.profession',
  'persons.enProfession' = 'persons.enProfession',
  'facts.type' = 'facts.type',
  'facts.value' = 'facts.value',
  'facts.spoiler' = 'facts.spoiler',
  'fees.world' = 'fees.world',
  'fees.usa' = 'fees.usa',
  'fees.russia' = 'fees.russia',
  'premiere.world' = 'premiere.world',
  'premiere.usa' = 'premiere.usa',
  'premiere.russia' = 'premiere.russia',
  'premiere.digital' = 'premiere.digital',
  'premiere.dvd' = 'premiere.dvd',
  'premiere.bluRay' = 'premiere.bluRay',
  'premiere.cinema' = 'premiere.cinema',
  'premiere.country' = 'premiere.country',
  'similarMovies.id' = 'similarMovies.id',
  'similarMovies.name' = 'similarMovies.name',
  'similarMovies.enName' = 'similarMovies.enName',
  'similarMovies.alternativeName' = 'similarMovies.alternativeName',
  'similarMovies.poster.url' = 'similarMovies.poster.url',
  'sequelsAndPrequels.id' = 'sequelsAndPrequels.id',
  'sequelsAndPrequels.name' = 'sequelsAndPrequels.name',
  'sequelsAndPrequels.enName' = 'sequelsAndPrequels.enName',
  'sequelsAndPrequels.alternativeName' = 'sequelsAndPrequels.alternativeName',
  'sequelsAndPrequels.poster.url' = 'sequelsAndPrequels.poster.url',
  'watchability.items.name' = 'watchability.items.name',
  'watchability.items.url' = 'watchability.items.url',
  'watchability.items.logo.url' = 'watchability.items.logo.url',
  lists = 'lists',
}
enum MovieSelectFieldV1_4 {
  'id' = 'id',
  'externalId' = 'externalId',
  name = 'name',
  enName = 'enName',
  alternativeName = 'alternativeName',
  'names' = 'names',
  description = 'description',
  shortDescription = 'shortDescription',
  slogan = 'slogan',
  type = 'type',
  typeNumber = 'typeNumber',
  isSeries = 'isSeries',
  status = 'status',
  year = 'year',
  'releaseYears' = 'releaseYears',
  'rating' = 'rating',
  ratingMpaa = 'ratingMpaa',
  ageRating = 'ageRating',
  'votes' = 'votes',
  'budget' = 'budget',
  'audience' = 'audience',
  movieLength = 'movieLength',
  totalMovieLength = 'totalMovieLength',
  totalSeriesLength = 'totalSeriesLength',
  'genres' = 'genres',
  'countries' = 'countries',
  'poster' = 'poster',
  'backdrop' = 'backdrop',
  'logo' = 'logo',
  'ticketsOnSale' = 'ticketsOnSale',
  'videos' = 'videos',
  'networks' = 'networks',
  'persons' = 'persons',
  'facts' = 'facts',
  'fees' = 'fees',
  'premiere.world' = 'premiere.world',
  'similarMovies' = 'similarMovies',
  'sequelsAndPrequels' = 'sequelsAndPrequels',
  'watchability' = 'watchability',
  lists = 'lists',
}
enum MovieTypeV1_4 {
  'movie' = 'movie',
  'tv-series' = 'tv-series',
  'cartoon' = 'cartoon',
  'animated-series' = 'animated-series',
  'anime' = 'anime',
}
enum MovieStatusV1_4 {
  'announced' = 'announced',
  'completed' = 'completed',
  'filming' = 'filming',
  'post-production' = 'post-production',
  'pre-production' = 'pre-production',
}

enum RatingMpaaV1_4 {
  'G' = 'G',
  'NC-17' = 'NC-17',
  'PG' = 'PG',
  'PG-13' = 'PG-13',
  'R' = 'R',
}

export class MovieRequestDtoV1_4 {
  @ApiPropertyOptional({ description: 'Номер страницы', minimum: 1, default: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @ParseNumber()
  @SetDefaultValue(1)
  @Expose()
  page: number;

  @ApiPropertyOptional({ description: 'Количество элементов на странице', minimum: 1, maximum: 250, default: 10 })
  @IsOptional()
  @Validate(IsValueInRange, [1, 250])
  @ParseNumber()
  @SetDefaultValue(10)
  @Expose()
  limit: number;

  @ApiPropertyOptional({
    description: 'Список полей требуемых в ответе из модели',
    isArray: true,
    enum: MovieSelectFieldV1_4,
  })
  @IsOptional()
  @ToArray()
  @Validate(IsEnumParam, [MovieSelectFieldV1_4])
  @Expose()
  selectFields?: string[];

  @ApiPropertyOptional({
    isArray: true,
    description: 'Список полей которые не должны быть null или пусты',
    enum: MovieFieldV1_4,
  })
  @IsOptional()
  @ToArray()
  @Validate(IsEnumParam, [MovieFieldV1_4])
  @Expose()
  notNullFields?: string[];

  @ApiPropertyOptional({ description: 'Сортировка по полям из модели', isArray: true, enum: MovieFieldV1_4 })
  @IsOptional()
  @Validate(IsEnumParam, [MovieFieldV1_4])
  @Validate(AreArrayLengthsEqual, ['sortType'])
  @ToArray()
  @Expose()
  sortField?: string[];

  @ApiPropertyOptional({ description: 'Тип сортировки применительно к полям из sortField (пример: `"1", "-1"`)' })
  @IsOptional()
  @Validate(IsValues, ['1', '-1'])
  @Validate(AreArrayLengthsEqual, ['sortField'])
  @ToArray()
  @Expose()
  sortType?: string[];

  @ApiNullableProperty({ isArray: true, description: 'Поиск по ID KinoPoisk (пример: `"666", "555", "!666"`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [250, 7000000])
  @Validate(IsNumberParam)
  @NumberParam()
  id?: string[];

  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по IMDB ID (пример: `"tt666", "tt555", "!tt666"`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsStartWith, ['tt'])
  @StringParam()
  'externalId.imdb'?: string[];

  @ApiNullableProperty({ type: 'number', isArray: true, description: 'Поиск по TMDB ID (пример: `666, 555, !666`)' })
  @IsOptional()
  @Validate(IsValueInRange, [1, 200000])
  @Validate(IsNumberParam)
  @ToArray()
  @NumberParam()
  'externalId.tmdb'?: string[];

  @ApiNullableProperty({
    type: 'string',
    isArray: true,
    description: 'Поиск по id KinoPoisk HD (пример: `"48e8d0acb0f62d8585101798eaeceec5", "!48e8d0acb0f62d8585101798eaeceec5"`)',
  })
  @IsOptional()
  @ToArray()
  @ToArray()
  @Validate(IsLengthExact, [32])
  @StringParam()
  'externalId.kpHD'?: string[];

  @ApiNullableProperty({ enum: MovieTypeV1_4, isArray: true, description: 'Поиск по типу фильма (пример: `"movie", "tv-series", "!anime"`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsEnumParam, [MovieTypeV1_4])
  @EnumParam()
  type: string[];
  @ApiNullableProperty({
    type: 'string',
    isArray: true,
    description:
      'Поиск по номеру типа фильма (пример: `1, 2, !3`). Список типов: 1 (movie), 2 (tv-series), 3 (cartoon), 4 (anime), 5 (animated-series).',
  })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [1, 5])
  @Validate(IsNumberParam)
  @NumberParam()
  typeNumber: string[];

  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по индикатору сериала (пример: `true, false`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsBooleanParam)
  @BooleanParam()
  isSeries: string;

  @ApiNullableProperty({
    enum: MovieStatusV1_4,
    isArray: true,
    description: 'Поиск по статусу фильма (пример: `"announced", "completed", "!filming"`)',
  })
  @IsOptional()
  @ToArray()
  @Validate(IsEnumParam, [MovieStatusV1_4])
  @EnumParam()
  status: string[];

  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по году (пример: `1874, 2050, !2020, 2020-2024`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [1874, 2050])
  @Validate(IsNumberParam)
  @NumberParam()
  year: string[];
  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по года начала релиза (пример: `1874, 2050, !2020, 2020-2024`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [1874, 2050])
  @Validate(IsNumberParam)
  @NumberParam()
  'releaseYears.start': string[];
  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по года окончания релиза (пример: `1874, 2050, !2020, 2020-2024`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [1874, 2050])
  @Validate(IsNumberParam)
  @NumberParam()
  'releaseYears.end': string[];

  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по рейтингу Кинопоиск (пример: `7, 10, 7.2-10`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [0, 10])
  @Validate(IsNumberParam)
  @NumberParam()
  'rating.kp': string[];
  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по рейтингу IMDB (пример: `7, 10, 7.2-10`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [0, 10])
  @Validate(IsNumberParam)
  @NumberParam()
  'rating.imdb': string[];
  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по рейтингу TMDB (пример: `7, 10, 7.2-10`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [0, 10])
  @Validate(IsNumberParam)
  @NumberParam()
  'rating.tmdb': string[];

  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по рейтингу MPAA (пример: `"G", "NC-17", "!R"`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsEnumParam, [RatingMpaaV1_4])
  @EnumParam()
  ratingMpaa: string[];
  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по возрастному рейтингу (пример: `12, !18, 12-18`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [0, 18])
  @Validate(IsNumberParam)
  @NumberParam()
  ageRating: string[];

  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по количеству голосов на KP (пример: `1000-6666666`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsNumberParam)
  @NumberParam()
  'votes.kp': string[];
  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по количеству голосов на IMDB (пример: `1000-6666666`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsNumberParam)
  @NumberParam()
  'votes.imdb': string[];
  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по количеству голосов на TMDB (пример: `1000-6666666`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsNumberParam)
  @NumberParam()
  'votes.tmdb': string[];
  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по количеству голосов кинокритиков (пример: `1000-6666666`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsNumberParam)
  @NumberParam()
  'votes.filmCritics': string[];
  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по количеству голосов кинокритиков из России (пример: `1000-6666666`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsNumberParam)
  @NumberParam()
  'votes.russianFilmCritics': string[];
  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по количеству голосов ожидания на Кинопоиске (пример: `1000-6666666`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsNumberParam)
  @NumberParam()
  'votes.await': string[];

  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по бюджету фильма (пример: `1000-6666666`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsNumberParam)
  @NumberParam()
  'budget.value': string[];

  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по количеству аудитории (пример: `1000-6666666`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsNumberParam)
  @NumberParam()
  'audience.count': string[];

  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по продолжительности фильма (пример: `100-120`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsNumberParam)
  @NumberParam()
  movieLength: string[];
  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по всей продолжительности одной серии (пример: `20-60`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsNumberParam)
  @NumberParam()
  seriesLength: string[];
  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по всей продолжительности сериала (пример: `100-120`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsNumberParam)
  @NumberParam()
  totalSeriesLength: string[];

  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по жанрам (пример: `"драма", "комедия", "!мелодрама", "+ужасы"`)' })
  @IsOptional()
  @ToArray()
  @StringParam()
  'genres.name': string[];
  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по странам (пример: `"США", "Россия", "!Франция" , "+Великобритания"`)' })
  @IsOptional()
  @ToArray()
  @StringParam()
  'countries.name': string[];

  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по наличию билетов в продаже (пример: `true, false`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsBooleanParam)
  @BooleanParam()
  'ticketsOnSale': string[];

  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по сетям производства фильма (пример: `"HBO", "Netflix", "!Amazon"`)' })
  @IsOptional()
  @ToArray()
  @StringParam()
  'networks.items.name': string[];

  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по ID персон (пример: `666, 555, !666`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [1, 9000000])
  @Validate(IsNumberParam)
  @NumberParam()
  'persons.id': string[];
  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по профессиям персон (пример: `"актер", "режиссер", "!сценарист"`)' })
  @IsOptional()
  @ToArray()
  'persons.profession': string[];
  @ApiNullableProperty({
    type: 'string',
    isArray: true,
    description: 'Поиск по английским профессиям персон (пример: `"actor", "director", "!writer"`)',
  })
  @IsOptional()
  @ToArray()
  'persons.enProfession': string[];

  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по сборам в мире (пример: `1000-6666666`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsNumberParam)
  'fees.world': string[];
  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по сборам в США (пример: `1000-6666666`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsNumberParam)
  'fees.usa': string[];
  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по сборам в России (пример: `1000-6666666`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsNumberParam)
  'fees.russia': string[];

  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по дате премьеры в мире (пример: `01.01.2020, 01.01.2020-31.12.2020`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsDateParam)
  'premiere.world': string[];
  @ApiNullableProperty({ type: 'string', isArray: true, description: 'Поиск по дате премьеры в США (пример: `01.01.2020, 01.01.2020-31.12.2020`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsDateParam)
  'premiere.usa': string[];
  @ApiNullableProperty({
    type: 'string',
    isArray: true,
    description: 'Поиск по дате премьеры в России (пример: `01.01.2020, 01.01.2020-31.12.2020`)',
  })
  @IsOptional()
  @ToArray()
  @Validate(IsDateParam)
  'premiere.russia': string[];
  @ApiNullableProperty({
    type: 'string',
    isArray: true,
    description: 'Поиск по дате премьеры в стриминговых сервисах (пример: `01.01.2020, 01.01.2020-31.12.2020`)',
  })
  @IsOptional()
  @ToArray()
  @Validate(IsDateParam)
  'premiere.digital': string[];
  @ApiNullableProperty({
    type: 'string',
    isArray: true,
    description: 'Поиск по дате премьеры в кинотеатрах (пример: `01.01.2020, 01.01.2020-31.12.2020`)',
  })
  @IsOptional()
  @ToArray()
  @Validate(IsDateParam)
  'premiere.cinema': string[];
  @ApiNullableProperty({
    type: 'string',
    isArray: true,
    description: 'Поиск по стране премьеры (пример: `"США", "Россия", "!Франция" , "+Великобритания"`)',
  })
  @IsOptional()
  @ToArray()
  'premiere.country': string[];

  @ApiNullableProperty({ isArray: true, description: 'Поиск по ID KinoPoisk из списка похожих фильмов (пример: `666, 555, !666`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [250, 7000000])
  @Validate(IsNumberParam)
  'similarMovies.id': string[];

  @ApiNullableProperty({ isArray: true, description: 'Поиск по ID KinoPoisk из списка сиквелов и преквелов (пример: `666, 555, !666`)' })
  @IsOptional()
  @ToArray()
  @Validate(IsValueInRange, [250, 7000000])
  @Validate(IsNumberParam)
  'sequelsAndPrequels.id': string[];

  @ApiNullableProperty({
    type: 'string',
    isArray: true,
    description: 'Поиск по доуступным платформам для просмотра (пример: `"ivi", "okko", "!megogo"`)',
  })
  @IsOptional()
  @ToArray()
  @StringParam()
  'watchability.items.name': string[];

  @ApiNullableProperty({
    type: 'string',
    isArray: true,
    description: 'Поиск по коллекциям из KinoPoisk (пример: `"top-250", "top-100-indian-movies", "!top-100-movies"`)',
  })
  @IsOptional()
  @ToArray()
  @StringParam()
  lists: string[];

  public model2Where() {
    const filter = new FilterBuilder();
    for (const key of Object.keys(this)) {
      const type = Reflect.getMetadata('type', this, key);

      switch (type) {
        case 'string':
          filter.setString(key, this[key]);
          break;
        case 'number':
          filter.setNumber(key, this[key]);
          break;
        case 'boolean':
          filter.setBoolean(key, this[key]);
          break;
        case 'date':
          filter.setDate(key, this[key]);
          break;
        case 'enum':
          filter.setEnum(key, this[key]);
          break;
        default:
          break;
      }
    }

    if (this.notNullFields?.length) {
      filter.setNotNull(this.notNullFields);
    }

    return filter.build();
  }

  public model2Select() {
    const select = new SelectBuilder();

    return select.build(this.selectFields);
  }

  public model2Sort(): { [key: string]: SortOrder } {
    const sort = new SortBuilder().build(this.sortField, this.sortType);

    return Object.keys(sort)?.length ? { ...sort, _id: -1 } : { 'votes.kp': -1, _id: -1 };
  }

  public model2Pagination() {
    const pagination = new PaginationBuilder();

    return pagination.build(this.page, this.limit);
  }
}
