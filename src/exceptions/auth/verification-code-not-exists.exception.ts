import { BasicHttpException } from '../basic-http.exception';
import { HttpStatus } from '@nestjs/common';

export class VerificationCodeNotExistsException extends BasicHttpException {
  constructor() {
    super(HttpStatus.NOT_FOUND, 'Verification code not exists');
  }
}
