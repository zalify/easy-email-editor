/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
const path = require('path');

export default {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageProvider: 'babel',
  moduleNameMapper: {
    '@core/(.+)': path.join(__dirname, '../easy-email-core/src/$1'),
    '^easy-email-core$': path.join(__dirname, '../easy-email-core/src/index.tsx'),
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
  },
  testMatch: ['<rootDir>/src/**/__tests__/**/*.[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['/node_modules/', '\\.pnp\\.[^\\/]+$'],
};
