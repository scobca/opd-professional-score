import { HttpStatus } from '@nestjs/common';

export class BasicErrorResponse<T> {
  constructor(message: T) {
    return {
      status: HttpStatus.BAD_REQUEST,
      body: message,
    };
  }
}
