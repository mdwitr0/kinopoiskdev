/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any*/

import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseQuery<I = any, O = any> implements PipeTransform<I, O> {
  transform(value: I, { type }: ArgumentMetadata): O {
    if (type !== 'query') return value as unknown as O;

    return this.transformQuery(value);
  }

  transformQuery(query: I): O {
    if (typeof query !== 'object' || !query) return query as unknown as O;
    for (const key of Object.keys(query)) {
      if (key.endsWith(']')) {
        const startIndex = key.indexOf('[');
        const endIndex = key.indexOf(']');
        const subKey = key.slice(startIndex + 1, endIndex);
        const k = key.substring(0, startIndex);
        query[k] = { [subKey]: query[key] };
        delete query[key];
      }
    }
    return query as unknown as O;
  }
}
