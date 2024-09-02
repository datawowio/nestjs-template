import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from '@infra/configuration/config';
import { TypeOrmPersistenceModule } from '@infra/persistence/typeorm/typeorm.module';

import { AdminHttpModule } from '@application/http/admin/admin-http.module';
import { HealthHttpModule } from '@application/http/health/health-http.module';
import { PublicHttpModule } from '@application/http/pubic/public-http.module';
import { UserHttpModule } from '@application/http/user/user-http.module';

@Module({
  imports: [
    // infra
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmPersistenceModule,

    // application
    AdminHttpModule,
    UserHttpModule,
    PublicHttpModule,
    HealthHttpModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
