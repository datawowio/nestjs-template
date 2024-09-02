import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '@core/domain/user/entity/user.entity';
import { IUserRepository } from '@core/domain/user/repository/user.repository';

import { User } from '../entity';

@Injectable()
export class UserRepository
  extends Repository<User>
  implements IUserRepository
{
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findUser({
    id,
    email,
  }: {
    id: number;
    email: string;
  }): Promise<UserEntity> {
    const user = await this.repository.findOne({ where: { email, id } });
    return user;
  }
}
