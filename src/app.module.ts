import { Module } from '@nestjs/common';

import { ConfigurationModule } from '@infra/configuration/configuration.module';
import { TypeOrmPersistenceModule } from '@infra/persistence/typeorm/typeorm.module';

import { HttpModule } from '@application/http/http.module';
import { UseCaseModule } from '@application/module/usecase/usecase.module';

@Module({
  imports: [
    // Global Module
    ConfigurationModule,
    UseCaseModule,
    TypeOrmPersistenceModule,

    // application
    HttpModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
