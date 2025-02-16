import { BasicHttpException } from '../basic-http.exception';
import { HttpStatus } from '@nestjs/common';

export class ProfessionalCharacteristicNotFoundException<
  T extends number | string,
> extends BasicHttpException {
  constructor(id: T, param: string) {
    super(
      HttpStatus.NOT_FOUND,
      `Professional characteristic with ${param} '${id}' not found `,
    );
  }
}
