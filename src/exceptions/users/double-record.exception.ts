import { BasicHttpException } from '../basic-http.exception';
import { HttpStatus } from '@nestjs/common';

export class DoubleRecordException extends BasicHttpException {
  constructor(message: string) {
    super(HttpStatus.CONFLICT, message);
  }
}
