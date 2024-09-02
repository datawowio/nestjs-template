import { Result } from 'oxide.ts';

import { UserEntity } from '../entity/user.entity';

export interface UserSignInCommand {
  email: string;
  password: string;
}

export interface IUserSignInUseCase {
  exec: (
    userSignInCommand: UserSignInCommand,
  ) => Promise<Result<UserEntity, string>>;
}
