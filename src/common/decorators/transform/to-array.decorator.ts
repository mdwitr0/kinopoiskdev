import { Transform } from 'class-transformer';

export const ToArray = () => {
  return Transform(({ value }: { value: unknown }) => {
    if (value === undefined) return value;
    if (Array.isArray(value)) return value;
    return [value];
  });
};
