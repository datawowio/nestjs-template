import { Test, TestingModule } from '@nestjs/testing';
import { UserSingInUseCase } from '@usecase/user/user-signin.usecase';

import { IUserRepository } from '@core/domain/user/repository/user.repository';

const mockUserRepository = {
  findUser: jest.fn().mockResolvedValue({
    id: 1,
    name: 'Bom',
    email: 'bom@test.com',
    password: 'password',
  }),
};

// This unit-test using mock method

describe('UserSingInUseCase', () => {
  let userSingInUseCase: UserSingInUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: IUserRepository, useValue: mockUserRepository },
        UserSingInUseCase,
      ],
    }).compile();

    userSingInUseCase = module.get<UserSingInUseCase>(UserSingInUseCase);
  });

  it('should return user when signin successful"', async () => {
    const result = await userSingInUseCase.exec({
      email: 'bom@test.com',
      password: 'password',
    });

    const response = result.unwrapOr(null);

    expect(response).not.toBe(null);
    expect(response).toEqual({
      id: 1,
      name: 'Bom',
      email: 'bom@test.com',
      password: 'password',
    });
  });
});
