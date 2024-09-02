import { UserEntity } from '../entity/user.entity';

export abstract class IUserRepository {
  abstract save<T>(data: T): Promise<T>;
  abstract findUser({
    id,
    email,
  }: {
    id?: number;
    email?: string;
  }): Promise<UserEntity>;
}
