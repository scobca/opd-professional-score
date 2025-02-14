import { BasicHttpException } from '../../basic-http.exception';
import { HttpStatus } from '@nestjs/common';

export class SectionNotFoundException<
  T extends number,
> extends BasicHttpException {
  constructor(param: T, paramName: string) {
    super(
      HttpStatus.NOT_FOUND,
      `Section with ${paramName}: '${param.toString()}' not found.`,
    );
  }
}
