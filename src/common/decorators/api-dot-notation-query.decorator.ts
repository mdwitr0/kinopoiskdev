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

const getDescription = (text: string, example: any) => {
  let description = '';
  if (text) description += text + '. <br/>';
  if (example) description += `<br/>Пример: \`${example}\``;
  return description;
};

const getQueryDecorators = (model: Function, parrentProperty?: string) => {
  const constructor = model.prototype;

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

    const type = meta?.type();
    if (!type?.name) {
      return [
        ApiQuery({
          name: parrentProperty ? `${parrentProperty}.${property}` : property,
          type: meta.type,
          required: false,
          example: undefined,

          description: getDescription(meta.description, meta.example),
        }),
      ];
    }
    switch (type.name) {
      case 'String':
      case 'Number':
      case 'Boolean':
        return [
          ApiQuery({
            name: parrentProperty ? `${parrentProperty}.${property}` : property,
            ...meta,
            description: getDescription(meta.description, meta.example),
            required: false,
            example: undefined,
          }),
        ];
      default:
        return getQueryDecorators(type, property);
    }
  });
};

export const ApiDotNotationQuery = (...models: Function[]) => {
  const decorators = models.flatMap((model) => getQueryDecorators(model));
  return applyDecorators(...decorators);
};
