import { DataSource } from 'typeorm';

import { TestingModule } from '@nestjs/testing';

import { UserEntity } from '@core/domain/user/entity/user.entity';
import { IUserRepository } from '@core/domain/user/repository/user.repository';

import { User } from '@infra/persistence/typeorm/entity/user.entity';
import { UserRepository } from '@infra/persistence/typeorm/repository';

import { TestUtils } from '../../utils/test-utils';

describe('UserRepository', () => {
  let testUtils: TestUtils;
  let dataSource: DataSource;
  let userRepository: IUserRepository;

  TestUtils.setup();

  beforeAll(async () => {
    const module: TestingModule =
      await TestUtils.createTestModuleUtil().compile();

    dataSource = module.get<DataSource>(DataSource);
    userRepository = module.get<UserRepository>(IUserRepository);

    testUtils = new TestUtils(dataSource);
    await testUtils.reloadFixtures();
  });

  describe('method save', () => {
    beforeAll(async () => {
      await testUtils.reloadFixtures();
    });

    it('should create new user"', async () => {
      const user = new UserEntity();
      user.firstname = 'bom-a';
      user.lastname = 'test';
      user.email = 'bom-a@test.com';
      user.password = 'password';

      const result = await userRepository.save(user);

      expect(result).toMatchObject({
        email: 'bom-a@test.com',
        password: 'password',
      });
    });

    it('should cannot create new user with duplicate email"', async () => {
      const user = new UserEntity();
      user.firstname = 'bom-b';
      user.lastname = 'test';
      user.email = 'bom-a@test.com';
      user.password = 'password';

      try {
        await userRepository.save(user);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('method findUser', () => {
    beforeAll(async () => {
      await testUtils.reloadFixtures();
    });

    it('should get nothing by random id before create"', async () => {
      const result = await userRepository.findUser({ id: 1 });
      expect(result).toBe(null);
    });

    it('should get by random email before create', async () => {
      const result = await userRepository.findUser({ email: 'bom-a@test.com' });
      expect(result).toBe(null);
    });

    it('should get one user after create', async () => {
      const user = new UserEntity();
      user.firstname = 'bom-c';
      user.lastname = 'test';
      user.email = 'bom-c@test.com';
      user.password = 'password';
      await userRepository.save(user);

      const result = await userRepository.findUser({ email: 'bom-c@test.com' });
      expect(result).not.toBe(null);
      expect(result).toMatchObject({ email: 'bom-c@test.com' });
    });
  });

  describe('method findAllUser', () => {
    beforeAll(async () => {
      await testUtils.reloadFixtures();
    });

    it('should get nothing when have no users', async () => {
      const result = await userRepository.findAllUser({});
      expect(result).toEqual([]);
    });

    it('should get one user after insert 1 user', async () => {
      const userRepoOrm = dataSource.getRepository(User);
      await userRepoOrm.insert([
        {
          firstname: 'user1',
          lastname: 'test',
          password: 'password1',
          email: 'user1@test.com',
        },
      ]);
      const result = await userRepository.findAllUser({});
      expect(result).toHaveLength(1);
    });

    it('should get two user after insert 1 more user', async () => {
      const userRepoOrm = dataSource.getRepository(User);
      await userRepoOrm.insert([
        {
          firstname: 'user2',
          lastname: 'test',
          password: 'password2',
          email: 'user2@test.com',
        },
      ]);
      const result = await userRepository.findAllUser({});
      expect(result).toHaveLength(2);
    });
  });
});
