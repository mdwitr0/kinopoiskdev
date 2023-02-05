/* eslint-disable @typescript-eslint/ban-types*/

import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiQuery, ApiQueryOptions } from '@nestjs/swagger';
import { SortTypeEnum } from '../enum/sort.enum';

const getPagingDecorators = (fn: Function) => {
  const constructor = fn.prototype;
  if (Reflect.getMetadata('swagger/apiModelPropertiesArray', constructor)) {
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
  } else {
    return [];
  }
};

const getQueryDecorators = (fn: Function, parrentProperty?: string) => {
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

    const type = meta.type();

    switch (type.name) {
      case 'String':
      case 'Number':
      case 'Boolean':
        return [
          ApiQuery({
            name: parrentProperty ? `${parrentProperty}.${property}` : property,
            ...meta,
            type: 'string',
            example: meta.example || meta.default,
            examples: meta.examples,
            isArray: true,
            required: false,
          }),
        ];
      default:
        return getQueryDecorators(type, property);
    }
  });
};

export const ApiDotNotationQuery = (query: Function) => {
  return applyDecorators(...getQueryDecorators(query));
};
