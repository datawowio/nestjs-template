import { Result } from 'oxide.ts';

import { UserEntity } from '../entity/user.entity';

export interface UserSignUpCommand {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface IUserSignUpUseCase {
  exec: (
    userSignupCommand: UserSignUpCommand,
  ) => Promise<Result<UserEntity, string>>;
}
