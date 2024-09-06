import { DataSource } from 'typeorm';

import { TestingModule } from '@nestjs/testing';
import { UserSingUpUseCase } from '@usecase/user/user-signup.usecase';

import { TestUtils } from '../../utils/test-utils';

// This unit-test using real repository implementation

describe('UserSingUpUseCase', () => {
  let userSingUpUseCase: UserSingUpUseCase;
  let testUtils: TestUtils;
  let dataSource: DataSource;

  TestUtils.setup();

  beforeAll(async () => {
    const module: TestingModule = await TestUtils.createTestModuleUtil({
      providers: [UserSingUpUseCase],
    }).compile();

    userSingUpUseCase = module.get<UserSingUpUseCase>(UserSingUpUseCase);
    dataSource = module.get<DataSource>(DataSource);

    testUtils = new TestUtils(dataSource);
    await testUtils.reloadFixtures();
  });

  it('should return user when signup successful"', async () => {
    const result = await userSingUpUseCase.exec({
      firstname: 'bom',
      lastname: 'test',
      email: 'bom@test.com',
      password: 'password',
    });

    const response = result.unwrapOr(null);

    expect(response).not.toBe(null);
    expect(response).toMatchObject({
      firstname: 'bom',
      lastname: 'test',
      email: 'bom@test.com',
      password: 'password',
    });
  });
});
