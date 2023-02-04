export const RemoveArrayBrackets = (query: any): any => {
  for (const key of Object.keys(query)) {
    if (key.endsWith('[]')) {
      const cleanKey = key.split('[]')[0];
      query[cleanKey] = query[key];
      delete query[key];
    }
  }
  return query;
};
