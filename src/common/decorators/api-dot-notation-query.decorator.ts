/* eslint-disable @typescript-eslint/ban-types*/

import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

const getDescription = (text: string, example: any, type?: any) => {
  let description = '';
  if (text) description += text + '. <br/>';
  if (type) description += `Тип в базе: \`${type}\``;
  if (example) description += `<br/>Пример: \`${example}\``;
  return description;
};

const getQueryDecorators = (model: Function, parentProperty?: string) => {
  const constructor = model.prototype;

  const properties = Reflect.getMetadata('swagger/apiModelPropertiesArray', constructor).map((prop) =>
    prop.substring(1),
  );

  return properties.flatMap((property) => {
    const meta = Reflect.getMetadata('swagger/apiModelProperties', constructor, property);

    const type = meta?.type();
    if (!type?.name) {
      return [
        ApiQuery({
          name: parentProperty ? `${parentProperty}.${property}` : property,
          ...meta,
          type: 'string',
          required: false,
          example: undefined,
          description: getDescription(meta.description, meta.example, meta.type),
        }),
      ];
    }
    switch (type.name) {
      case 'String':
      case 'Number':
      case 'Boolean':
        return [
          ApiQuery({
            name: parentProperty ? `${parentProperty}.${property}` : property,
            ...meta,
            type: 'string',
            description: getDescription(meta.description, meta.example, meta.type),
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
