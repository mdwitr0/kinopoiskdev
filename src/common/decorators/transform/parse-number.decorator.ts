import { Transform } from 'class-transformer';

export const ParseNumber = () =>
  Transform(({ value }) => {
    if (typeof value === 'string') return Number(value);
    return value;
  });
