import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { BasicHttpExceptionFilter } from './filters/basic-http-exception.filter';
import { ValidationErrorFilter } from './filters/validation-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new BasicHttpExceptionFilter(),
    new ValidationErrorFilter(),
  );
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
