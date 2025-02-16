import { BasicHttpException } from '../basic-http.exception';
import { HttpStatus } from '@nestjs/common';

export class PermissionDeniedException extends BasicHttpException {
  constructor() {
    super(
      HttpStatus.FORBIDDEN,
      "That user hasn't got enough rights for this request.",
    );
  }
}
