import config from './jest.shared';

export default {
  ...config,
  testMatch: ['<rootDir>/src/**/__test__/**/*.spec.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/__test__/e2e/'],
};
