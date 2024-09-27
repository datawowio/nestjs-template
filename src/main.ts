import { initializeTransactionalContext } from 'typeorm-transactional';

import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ConfigurationService } from '@infra/configuration/config.service';

import { AppModule } from './app.module';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(ConfigurationService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix(appConfig.app.prefix);

  await app.listen(appConfig.app.port);
}

bootstrap();
