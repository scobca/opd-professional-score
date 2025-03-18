import { HttpStatus } from '@nestjs/common';
import { BasicHttpException } from '../basic-http.exception';

export class DismissCreatingDocumentException<T> extends BasicHttpException {
  constructor(content: string, model: T) {
    super(
      HttpStatus.NOT_FOUND,
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `Creating new document was dismissed: ${content}: ${model}`,
    );
  }
}
