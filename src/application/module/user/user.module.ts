import { Module } from '@nestjs/common';
import { UserSingInUseCase } from '@usecase/user/user-signin.usecase';
import { UserSingUpUseCase } from '@usecase/user/user-signup.usecase';

@Module({
  imports: [],
  providers: [UserSingInUseCase, UserSingUpUseCase],
  exports: [UserSingInUseCase, UserSingUpUseCase],
})
export class UserModule {}
