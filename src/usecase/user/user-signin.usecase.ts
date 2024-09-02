import { Err, Ok, Result } from 'oxide.ts';

import { Injectable } from '@nestjs/common';

import { UserEntity } from '@core/domain/user/entity/user.entity';
import { IUserRepository } from '@core/domain/user/repository/user.repository';
import {
  IUserSignInUseCase,
  UserSignInCommand,
} from '@core/domain/user/usecase/user-signin.usecase';

@Injectable()
export class UserSingInUseCase implements IUserSignInUseCase {
  constructor(private userRepository: IUserRepository) {}

  async exec(
    userSignInCommand: UserSignInCommand,
  ): Promise<Result<UserEntity, string>> {
    const existingUser = await this.userRepository.findUser({
      email: userSignInCommand.email,
    });

    if (!existingUser) {
      return Err('user not found');
    }

    if (existingUser.password !== userSignInCommand.password) {
      return Err('password not correct');
    }

    return Ok(existingUser);
  }
}
