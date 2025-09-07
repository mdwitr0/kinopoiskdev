import { Transform } from 'class-transformer';

export const ValuesToObjects = (key: string) =>
  Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map((item) => ({ [key]: item }));
    }
  });
