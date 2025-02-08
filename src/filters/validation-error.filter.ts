import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ValidationError } from 'sequelize';
import { Response } from 'express';

@Catch(ValidationError)
export class ValidationErrorFilter implements ExceptionFilter {
  catch(e: ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return response.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      message: e.message,
      cause: e.name,
    });
  }
}
