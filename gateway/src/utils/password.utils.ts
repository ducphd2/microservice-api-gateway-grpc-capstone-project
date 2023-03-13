import { verify, hash } from 'argon2';

import { isEmpty } from 'lodash';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordUtils {
  async compare(password: string, hash: string): Promise<boolean> {
    return verify(hash, password);
  }

  async hash(password: string): Promise<string> {
    if (isEmpty(password) || password.length < 6) {
      throw new Error('Password must be at least 8 characters.');
    }

    return hash(password);
  }
}
