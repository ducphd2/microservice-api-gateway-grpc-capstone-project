import { v4 as uuid } from 'uuid';

export const getDateInSeconds = (date: Date): number => Math.floor(date.getTime() / 1000);

export const getCurrentDateInSecond = getDateInSeconds(new Date());

export const generateUniqueId = uuid();
