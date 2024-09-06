import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { PublicV1Controller } from './v1/public.v1.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [PublicV1Controller],
})
export class PublicHttpModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply().forRoutes(PublicV1Controller);
  }
}
