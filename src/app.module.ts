import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from '@infra/configuration/config';
import { TypeOrmPersistenceModule } from '@infra/persistence/typeorm/typeorm.module';

import { HttpModule } from '@application/http/http.module';
import { UseCaseModule } from '@application/module/usecase/usecase.module';

@Module({
  imports: [
    // Global Module
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
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
