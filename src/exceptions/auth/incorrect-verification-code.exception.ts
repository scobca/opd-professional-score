import { BasicHttpException } from '../basic-http.exception';
import { HttpStatus } from '@nestjs/common';

export class IncorrectVerificationCodeException extends BasicHttpException {
  constructor() {
    super(HttpStatus.FORBIDDEN, 'Incorrect verification code');
  }
}
