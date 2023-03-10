import { hash } from 'argon2';

export async function hashPassword(password: string): Promise<string> {
  return await hash(password);
}
