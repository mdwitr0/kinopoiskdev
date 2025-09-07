import { Transform } from 'class-transformer';

export const SetDefaultValue = (defaultValue) => Transform(({ value }) => (value === undefined ? defaultValue : value));
