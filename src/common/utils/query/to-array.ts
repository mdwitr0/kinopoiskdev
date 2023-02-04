export const ToArray = (value): any => {
  if (Array.isArray(value)) return value;
  return value ? [value] : [];
};
