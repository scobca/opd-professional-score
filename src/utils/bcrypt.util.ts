import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptUtil {
  public async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  public async compare(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
