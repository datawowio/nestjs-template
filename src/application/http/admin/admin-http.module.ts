import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AdminV1Controller } from './v1/admin.v1.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [AdminV1Controller],
})
export class AdminHttpModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply().forRoutes(AdminV1Controller);
  }
}
