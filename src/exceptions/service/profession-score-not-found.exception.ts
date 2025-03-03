import { BasicHttpException } from '../basic-http.exception';
import { HttpStatus } from '@nestjs/common';

export class ProfessionScoreNotFound extends BasicHttpException {
  constructor() {
    super(HttpStatus.NOT_FOUND, 'Profession score with that params not found.');
  }
}
