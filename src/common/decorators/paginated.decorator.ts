import { applyDecorators, UsePipes } from '@nestjs/common';
import { PaginatedQueryDto } from '../dto/query/paginated.query.dto';
import { ToolsQueryDto } from '../dto/query/tools.query.dto';
import { QueryPipe } from '../pipes/query.pipe';
import { ApiBaseResponse } from './api-base-response.decorator';
import { ApiDotNotationQuery } from './api-dot-notation-query.decorator';

export interface EntityFields {
  allowFieldsFindAll: string[];
  excludedValuesFields: string[];
  idKeys: string[];
  regexSearchKeys: string[];
  dateSearchKeys: string[];
  numberSearchKeys: string[];
  blacklistFields?: string[];
  booleanFields?: string[];
}

export interface Entities {
  [key: string]: EntityFields;
}

const entitiesField: Entities = {
  movie: {
    allowFieldsFindAll: [
      'id',
      'externalId',
      'name',
      'logo',
      'color',
      'shortDescription',
      'horizontalPoster',
      'alternativeName',
      'enName',
      'names',
      'type',
      'movieLength',
      'description',
      'year',
      'poster',
      'votes',
      'rating',
      'watchability',
      'releaseYears',
      'genres',
      'countries',
    ],
    excludedValuesFields: ['genres.name', 'countries.name'],
    idKeys: ['id', 'externalId.imdb'],
    regexSearchKeys: [
      'name',
      'alternativeName',
      'enName',
      'names.name',
      'tagline',
      'slogan',
      'description',
      'persons.name',
      'persons.enName',
      'persons.description',
    ],
    dateSearchKeys: ['premiere.world', 'premiere.russia', 'premiere.digital', 'premiere.bluray', 'premiere.dvd'],
    numberSearchKeys: [
      'id',
      'externalId.tmdb',
      'typeNumber',
      'movieLength',
      'year',
      'rating.kp',
      'rating.imdb',
      'rating.tmdb',
      'rating.filmCritics',
      'rating.russianFilmCritics',
      'rating.await',
      'votes.kp',
      'votes.imdb',
      'votes.tmdb',
      'votes.filmCritics',
      'votes.russianFilmCritics',
      'votes.await',
      'ratingAgeLimits',
      'ageRating',
      'persons.id',
      'budget.value',
      'fees.world',
      'fees.usa',
      'fees.russia',
      'image.postersCount',
      'image.backdropsCount',
      'image.framesCount',
      'reviewInfo.count',
      'reviewInfo.positiveCount',
      'seasonsInfo.number',
      'seasonsInfo.episodesCount',
      'videos.trailers.size',
      'videos.teasers.size',
      'audience.count',
      'totalSeriesLength',
      'seriesLength',
    ],
    booleanFields: ['ticketsOnSale', 'isSeries'],
  },
  person: {
    blacklistFields: [
      '-_id',
      '-profession._id',
      '-birthPlace._id',
      '-deathPlace._id',
      '-facts._id',
      '-movies._id',
      '-isParse',
    ],
    excludedValuesFields: [],
    allowFieldsFindAll: ['id', 'name', 'enName', 'photo', 'age', 'sex'],
    idKeys: ['id'],
    regexSearchKeys: [
      'name',
      'enName',
      'movies.name',
      'slogan',
      'description',
      'persons.name',
      'persons.enName',
      'persons.description',
    ],
    dateSearchKeys: ['birthday', 'death'],
    numberSearchKeys: [
      'id',
      'movies.id',
      'movies.rating',
      'age',
      'countAwards',
      'growth',
      'spouses.id',
      'spouses.children',
      'spouses.name',
    ],
    booleanFields: [],
  },
  review: {
    excludedValuesFields: [],
    blacklistFields: ['-_id', '-episodes._id'],
    allowFieldsFindAll: ['movieId', 'id', 'title', 'type', 'review', 'author', 'date'],
    idKeys: ['id'],
    regexSearchKeys: [],
    dateSearchKeys: ['date'],
    numberSearchKeys: ['movieId', 'id'],
    booleanFields: [],
  },
  season: {
    excludedValuesFields: [],
    blacklistFields: ['-_id', '-episodes._id'],
    allowFieldsFindAll: [
      'movieId',
      'number',
      'episodesCount',
      'episodes.number',
      'episodes.name',
      'episodes.enName',
      'episodes.date',
      'episodes.description',
    ],
    idKeys: ['id'],
    regexSearchKeys: [],
    dateSearchKeys: ['episodes.date'],
    numberSearchKeys: ['movieId', 'number', 'episodesCount', 'episodes.number'],
    booleanFields: [],
  },
  image: {
    excludedValuesFields: [],
    blacklistFields: ['-_id'],
    allowFieldsFindAll: ['url', 'previewUrl', 'width', 'language', 'height', 'type', 'movieId'],
    idKeys: ['id'],
    regexSearchKeys: [],
    dateSearchKeys: [],
    numberSearchKeys: ['movieId', 'height', 'width'],
    booleanFields: [],
  },
  personaward: {
    excludedValuesFields: [],
    blacklistFields: ['-_id', 'id'],
    allowFieldsFindAll: [],
    idKeys: ['personId'],
    regexSearchKeys: ['nomination.award.title', 'movie.name'],
    dateSearchKeys: [],
    numberSearchKeys: ['movie.id', 'personId', 'movie.rating'],
    booleanFields: [],
  },
  movieaward: {
    excludedValuesFields: [],
    blacklistFields: ['-_id', 'id'],
    allowFieldsFindAll: [],
    idKeys: ['movieId'],
    regexSearchKeys: ['nomination.award.title', 'movie.name'],
    dateSearchKeys: [],
    numberSearchKeys: ['movieId'],
    booleanFields: [],
  },
  keyword: {
    excludedValuesFields: [],
    blacklistFields: ['-_id'],
    allowFieldsFindAll: [],
    idKeys: ['movies.id', 'id'],
    regexSearchKeys: ['title'],
    dateSearchKeys: [],
    numberSearchKeys: ['id', 'movies.id'],
    booleanFields: [],
  },
  studio: {
    excludedValuesFields: [],
    blacklistFields: ['-_id'],
    allowFieldsFindAll: [],
    idKeys: ['movies.id', 'id'],
    regexSearchKeys: ['title'],
    dateSearchKeys: [],
    numberSearchKeys: ['id', 'movies.id'],
    booleanFields: [],
  },
};

const versionsEntityField: Entities = {
  moviedtov1: entitiesField.movie,
  moviedtov1_3: entitiesField.movie,
  person: entitiesField.person,
  review: entitiesField.review,
  season: entitiesField.season,
  image: entitiesField.image,
  personaward: entitiesField.personaward,
  movieaward: entitiesField.movieaward,
  keyword: entitiesField.keyword,
  studio: entitiesField.studio,
};

export const Paginated = (
  entityDto: any,
  entity: any,
  { findForAllProperties, isArray }: { findForAllProperties?: boolean; isArray?: boolean },
) => {
  return applyDecorators(
    UsePipes(new QueryPipe(versionsEntityField[entity.name.toLowerCase()])),
    findForAllProperties
      ? ApiDotNotationQuery(ToolsQueryDto, PaginatedQueryDto, entity)
      : ApiDotNotationQuery(ToolsQueryDto, PaginatedQueryDto),
    ApiBaseResponse({ type: entityDto, isArray }),
  );
};
