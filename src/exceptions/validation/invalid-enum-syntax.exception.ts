import { BasicHttpException } from '../basic-http.exception';
import { HttpStatus } from '@nestjs/common';

export class InvalidEnumSyntaxException extends BasicHttpException {
  constructor(enumModel: string, cause: string) {
    const message = `Tag '${cause}' isn't valid tag for '${enumModel}'`;
    super(HttpStatus.BAD_REQUEST, message);
  }
}
