import { DateTime } from 'luxon';

export const normalizeDate = (dateString: string) => {
  const dateTime = DateTime.fromFormat(dateString, 'dd.MM.yyyy', { zone: 'UTC' });
  if (!dateTime.isValid) {
    throw new Error('Invalid date format');
  }

  return dateTime.toJSDate();
};
