import { BasicHttpException } from '../basic-http.exception';
import { HttpStatus } from '@nestjs/common';

export class IncorrectUserCreditsException extends BasicHttpException {
  constructor() {
    super(HttpStatus.UNAUTHORIZED, `User's email or password are incorrect`);
  }
}
