import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { HealthController } from './v1/health.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [HealthController],
})
export class HealthHttpModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply().forRoutes(HealthController);
  }
}
