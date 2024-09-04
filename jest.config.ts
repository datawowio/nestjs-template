import { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',

  // setup root dir project
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },

  // setup import alias used in project
  moduleNameMapper: {
    '^@infra/(.*)$': '<rootDir>/infra/$1',
    '^@core/(.*)$': '<rootDir>/core/$1',
    '^@application/(.*)$': '<rootDir>/application/$1',
    '^@usecase/(.*)$': '<rootDir>/usecase/$1',
    '^@src/(.*)$': '<rootDir>/$1',
  },

  // setup file
  setupFilesAfterEnv: ['<rootDir>/test/setup-env.ts'],

  moduleFileExtensions: ['js', 'json', 'ts'],
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};

export default config;
