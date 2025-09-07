export const getValueByPath = (path: string, value) => {
  const keys = path.split('.');
  for (const key of keys) value = value?.[key];
  return value;
};
