import { Module, NestModule } from '@nestjs/common';

import { AdminHttpModule } from '@application/http/admin/admin-http.module';
import { HealthHttpModule } from '@application/http/health/health-http.module';
import { PublicHttpModule } from '@application/http/pubic/public-http.module';
import { UserHttpModule } from '@application/http/user/user-http.module';

@Module({
  imports: [
    AdminHttpModule,
    HealthHttpModule,
    PublicHttpModule,
    UserHttpModule,
  ],
  providers: [],
  exports: [],
})
export class HttpModule implements NestModule {
  configure(): void {}
}
