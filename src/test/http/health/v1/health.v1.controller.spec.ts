import { Test, TestingModule } from '@nestjs/testing';

import { HealthController } from '@application/http/health/v1/health.controller';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [],
    }).compile();
    healthController = module.get<HealthController>(HealthController);
  });

  it('should return "application good health !!!"', () => {
    const result = healthController.health();
    expect(result).toBe('application good health !!!');
  });
});
