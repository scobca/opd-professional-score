import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { BasicHttpException } from '../exceptions/basic-http.exception';

@Catch(BasicHttpException)
export class BasicHttpExceptionFilter<T extends BasicHttpException>
  implements ExceptionFilter
{
  catch(e: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return response.status(e.getStatus()).json({
      status: e.getStatus(),
      message: e.message,
      cause: e.name,
    });
  }
}
