/* eslint-disable @typescript-eslint/ban-types*/

import { applyDecorators } from '@nestjs/common';
import { ApiQuery, ApiQueryOptions } from '@nestjs/swagger';
import { SortTypeEnum } from '../enum/sort.enum';

const getPagingDecorators = (fn: Function) => {
  const constructor = fn.prototype;
  const properties = Reflect.getMetadata(
    'swagger/apiModelPropertiesArray',
    constructor,
  ).map((prop) => prop.substr(1));

  return properties.flatMap((property) => {
    const meta = Reflect.getMetadata(
      'swagger/apiModelProperties',
      constructor,
      property,
    );
    const subClass = meta.type();
    if (subClass) {
      return getPagingDecorators(subClass);
    }
    return [
      ApiQuery({
        name: property,
        type: typeof subClass,
        ...meta,
      }),
    ];
  });
};

const getQueryDecorators = (
  fn: Function,
  fieldQuery: ApiQueryOptions,
  valueQuery: ApiQueryOptions,
) => {
  const constructor = fn.prototype;
  const properties = Reflect.getMetadata(
    'swagger/apiModelPropertiesArray',
    constructor,
  ).map((prop) => prop.substr(1));

  const field = properties.flatMap((property) => {
    const meta = Reflect.getMetadata(
      'swagger/apiModelProperties',
      constructor,
      property,
    );

    if (typeof meta.type !== 'function') return [property];
    const subClass = meta.type();

    if (typeof subClass === 'function') {
      const subClassProperties = Reflect.getMetadata(
        'swagger/apiModelPropertiesArray',
        subClass.prototype,
      ).map((prop) => prop.substr(1));

      return subClassProperties.map((subClassProperty) => {
        return `${property}.${subClassProperty}`;
      });
    } else {
      return [property];
    }
  });

  return [
    ApiQuery({
      name: fieldQuery.name,
      required: false,
      description: fieldQuery.description,
      isArray: true,
      enum: field,
    }),
    ApiQuery(valueQuery),
  ];
};

export const ApiDotNotationQuery = (
  query: Function,
  sortQuery?: Function,
  pagination?: Function,
) => {
  let decorators = getQueryDecorators(
    query,
    { name: 'field', description: 'Поля для выборки' },
    {
      name: 'search',
      description: 'Значения полей',
      required: false,
      isArray: true,
      type: 'string',
    },
  );
  if (pagination)
    decorators = decorators.concat(
      getQueryDecorators(
        sortQuery,
        { name: 'sortField', description: 'Поля для сортировки' },
        {
          name: 'sort',
          description: 'Значения полей сортировки',
          required: false,
          isArray: false,
          enum: SortTypeEnum,
        },
      ),
    );
  if (pagination)
    decorators = decorators.concat(getPagingDecorators(pagination));
  return applyDecorators(...decorators);
};
