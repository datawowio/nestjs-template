import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { UserV1Controller } from './v1/user.v1.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [UserV1Controller],
})
export class UserHttpModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply().forRoutes();
  }
}
