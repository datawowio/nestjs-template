import { Module } from '@nestjs/common';
import { AdminGetUsersUseCase } from '@usecase/user/admin-get-users.usecase';
import { UserSingInUseCase } from '@usecase/user/user-signin.usecase';
import { UserSingUpUseCase } from '@usecase/user/user-signup.usecase';

@Module({
  imports: [],
  providers: [UserSingInUseCase, UserSingUpUseCase, AdminGetUsersUseCase],
  exports: [UserSingInUseCase, UserSingUpUseCase, AdminGetUsersUseCase],
})
export class UserModule {}
