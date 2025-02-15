import { BasicHttpException } from '../basic-http.exception';
import { HttpStatus } from '@nestjs/common';

export class TypesMismatchException extends BasicHttpException {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
