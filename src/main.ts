import { initializeTransactionalContext } from 'typeorm-transactional';

import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import config from '@infra/configuration/config';

import { AppModule } from './app.module';

const appConfig = config().app;

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix(appConfig.prefix);

  await app.listen(appConfig.port);
}

bootstrap();
