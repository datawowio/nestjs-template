import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { UserModule } from '@application/module/user/user.module';

import { PublicV1Controller } from './v1/public.v1.controller';

@Module({
  imports: [UserModule],
  providers: [],
  controllers: [PublicV1Controller],
})
export class PublicHttpModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply().forRoutes(PublicV1Controller);
  }
}
