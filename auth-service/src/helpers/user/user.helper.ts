import { hash } from 'argon2';
import { v4 as uuid } from 'uuid';

export const generateUsername = uuid();

export async function hashPassword(password: string): Promise<string> {
  return await hash(password);
}

export const getDateInSeconds = (date: Date): number =>
  Math.floor(date.getTime() / 1000);

export const getCurrentDateInSecond = getDateInSeconds(new Date());
