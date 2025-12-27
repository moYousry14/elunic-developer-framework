import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 5001;
  await app.listen(port, '0.0.0.0');

  Logger.log(`System Health API running on: http://0.0.0.0:${port}/api`);
}

bootstrap();
