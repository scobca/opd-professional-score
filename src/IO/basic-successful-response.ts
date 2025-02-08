import { HttpStatus } from '@nestjs/common';

export class BasicSuccessfulResponse<T> {
  constructor(model: T) {
    return {
      status: HttpStatus.OK,
      body: model,
    };
  }
}
