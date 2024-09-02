import { Err, Ok, Result } from 'oxide.ts';

import { Injectable } from '@nestjs/common';

import { UserEntity } from '@core/domain/user/entity/user.entity';
import { IUserRepository } from '@core/domain/user/repository/user.repository';
import {
  IUserSignUpUseCase,
  UserSignUpCommand,
} from '@core/domain/user/usecase/user-signup.usecase';

@Injectable()
export class UserSingUpUseCase implements IUserSignUpUseCase {
  constructor(private userRepository: IUserRepository) {}

  async exec(
    userSignupCommand: UserSignUpCommand,
  ): Promise<Result<UserEntity, string>> {
    const existingUser = await this.userRepository.findUser({
      email: userSignupCommand.email,
    });

    if (existingUser) {
      return Err('existing user found');
    }

    const newUser = await this.userRepository.save<UserEntity>({
      firstname: userSignupCommand.firstname,
      lastname: userSignupCommand.firstname,
      email: userSignupCommand.email,
      password: userSignupCommand.password,
      orders: [],
    });

    return Ok(newUser);
  }
}
