import { BasicHttpException } from '../basic-http.exception';
import { HttpStatus } from '@nestjs/common';

export class SltNotFoundException<
  T extends string | number,
> extends BasicHttpException {
  constructor(param: T, paramName: string) {
    super(
      HttpStatus.NOT_FOUND,
      `Simple light test with ${paramName}: '${param.toString()}' not found.`,
    );
  }
}
