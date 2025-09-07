/* eslint-disable @typescript-eslint/ban-types */

import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

const getDescription = (text: string, example: any, type?: any) => {
  let description = '';
  if (text) description += text + '. <br/>';
  if (type) description += `Тип в базе: \`${type}\``;
  if (example) description += `<br/>Пример: \`${example}\``;
  return description;
};

const createApiQueryDecorator = (name: string, meta: any) => {
  return ApiQuery({
    name,
    ...meta,
    type: 'string',
    isArray: true,
    required: false,
    example: undefined,
    description: getDescription(meta.description, meta.example, meta.type),
  });
};

const getQueryDecorators = (model: Function, ...parentProperties: string[]) => {
  const constructor = model.prototype;

  const propertiesMetadata = Reflect.getMetadata('swagger/apiModelPropertiesArray', constructor);
  if (!propertiesMetadata) return [];

  const properties = propertiesMetadata.map((prop) => prop.substring(1));

  return properties.flatMap((property) => {
    const meta = Reflect.getMetadata('swagger/apiModelProperties', constructor, property);
    const fullName = parentProperties.length ? `${parentProperties.join('.')}.${property}` : property;

    const type = meta?.type();
    if (!type || !type.name) {
      return [createApiQueryDecorator(fullName, meta)];
    }

    const typeName = type.name;
    if (['String', 'Number', 'Boolean'].includes(typeName)) {
      return [createApiQueryDecorator(fullName, meta)];
    }

    return getQueryDecorators(type, ...[...parentProperties, property]);
  });
};

export const ApiDotNotationQuery = (...models: Function[]) => {
  const decorators = models.flatMap((model) => getQueryDecorators(model));
  return applyDecorators(...decorators);
};
