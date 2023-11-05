import { Transform } from 'class-transformer';

export const ParseNumber = () => {
  return Transform(({ value }: { value: unknown }) => {
    if (value === undefined) return value;

    if (Array.isArray(value)) return value.map((item) => Number(item));
    return Number(value);
  });
};
