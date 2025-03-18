import { BasicHttpException } from '../basic-http.exception';
import { HttpStatus } from '@nestjs/common';

export class NotExistsException extends BasicHttpException {
  constructor(message: string) {
    super(HttpStatus.NOT_FOUND, message);
  }
}
