import { HttpException, HttpStatus } from '@nestjs/common';

export class BasicHttpException extends HttpException {
  constructor(statusCode: HttpStatus, message: string) {
    super(message, statusCode);
  }
}
