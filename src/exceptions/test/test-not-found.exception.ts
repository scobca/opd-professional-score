import { BasicHttpException } from '../basic-http.exception';
import { HttpStatus } from '@nestjs/common';

export class TestNotFoundException<
  T extends string | number,
> extends BasicHttpException {
  constructor(param: T, paramName: string, testName: string) {
    super(
      HttpStatus.NOT_FOUND,
      `${testName} with ${paramName}: '${param.toString()}' not found.`,
    );
  }
}
