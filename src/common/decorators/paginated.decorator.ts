import { applyDecorators, UsePipes } from '@nestjs/common';
import { PaginatedQueryDto } from '../dto/query/paginated.query.dto';
import { ToolsQueryDto } from '../dto/query/tools.query.dto';
import { QueryPipe } from '../pipes/query.pipe';
import { ApiBaseResponse } from './api-base-response.decorator';
import { ApiDotNotationQuery } from './api-dot-notation-query.decorator';

export interface EntityFields {
  allowFieldsFindAll: string[];
  idKeys: string[];
  regexSearchKeys: string[];
  dateSearchKeys: string[];
  numberSearchKeys: string[];
  blacklistFields?: string[];
}

export interface Entities {
  movie: EntityFields;
  person: EntityFields;
  review: EntityFields;
  season: EntityFields;
  image: EntityFields;
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
    ],
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
      'externalId.imdb',
      'externalId.tmdb',
      'typeNumber',
      'movieLength',
      'year',
      'rating.kp',
      'rating.imdb',
      'rating.tmdb',
      'votes.kp',
      'votes.imdb',
      'votes.tmdb',
      'ratingAgeLimits',
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
    ],
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
  },
  review: {
    blacklistFields: ['-_id', '-episodes._id'],
    allowFieldsFindAll: ['movieId', 'id', 'title', 'type', 'review', 'author', 'date'],
    idKeys: ['id'],
    regexSearchKeys: [],
    dateSearchKeys: ['date'],
    numberSearchKeys: ['movieId', 'id'],
  },
  season: {
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
  },
  image: {
    blacklistFields: ['-_id'],
    allowFieldsFindAll: ['url', 'previewUrl', 'width', 'language', 'height', 'type', 'movieId'],
    idKeys: ['id'],
    regexSearchKeys: [],
    dateSearchKeys: [],
    numberSearchKeys: ['movieId', 'height', 'width'],
  },
};

export const Paginated = (entityDto: any, entity: any, findForAllProperties?: boolean) => {
  return applyDecorators(
    UsePipes(new QueryPipe(entitiesField[entity.name.toLowerCase()])),
    findForAllProperties
      ? ApiDotNotationQuery(ToolsQueryDto, PaginatedQueryDto, entity)
      : ApiDotNotationQuery(ToolsQueryDto, PaginatedQueryDto),
    ApiBaseResponse({ type: entityDto, isArray: true }),
  );
};
