import { Ok, Result } from 'oxide.ts';

import { Injectable } from '@nestjs/common';

import { UserEntity } from '@core/domain/user/entity/user.entity';
import { IUserRepository } from '@core/domain/user/repository/user.repository';
import { IAdminGetUsersUseCase } from '@core/domain/user/usecase/admin-get-users.usecase';

@Injectable()
export class AdminGetUsersUseCase implements IAdminGetUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async exec(): Promise<Result<UserEntity[], string>> {
    const existingUser = await this.userRepository.findAllUser({});
    return Ok(existingUser);
  }
}
