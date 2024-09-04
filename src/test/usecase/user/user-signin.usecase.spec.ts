import { Test, TestingModule } from '@nestjs/testing';
import { UserSingInUseCase } from '@usecase/user/user-signin.usecase';

import { IUserRepository } from '@core/domain/user/repository/user.repository';

const mockUserRepo = {
  findUser() {
    return jest.fn();
  },
};

describe('HealthController', () => {
  let userSingInUseCase: UserSingInUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: IUserRepository, useValue: mockUserRepo },
        UserSingInUseCase,
      ],
    }).compile();

    userSingInUseCase = module.get<UserSingInUseCase>(UserSingInUseCase);
  });

  it('should pass"', () => {
    userSingInUseCase.exec({ email: 'bom', password: 'pass' });
  });
});
