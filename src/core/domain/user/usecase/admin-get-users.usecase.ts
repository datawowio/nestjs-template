import { Result } from 'oxide.ts';

import { UserEntity } from '../entity/user.entity';

export interface IAdminGetUsersUseCase {
  exec: () => Promise<Result<UserEntity[], string>>;
}
