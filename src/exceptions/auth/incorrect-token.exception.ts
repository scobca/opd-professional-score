import { BasicHttpException } from '../basic-http.exception';
import { HttpStatus } from '@nestjs/common';

export class IncorrectTokenException extends BasicHttpException {
  constructor(message: string) {
    super(HttpStatus.UNAUTHORIZED, message);
  }
}
