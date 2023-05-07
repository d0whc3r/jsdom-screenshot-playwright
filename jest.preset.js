const path = require('path')
module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.json',
        isolatedModules: true,
      },
    ],
    '^.+\\.jsx?$': 'babel-jest',
  },
  // moduleNameMapper: {
  // },
  cache: true,
  cacheDirectory: path.join(__dirname, 'node_modules/.cache/jest'),
  // setupFilesAfterEnv: [path.resolve(__dirname, 'jest.setupafterenv.tsx')],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!*.config.js',
    '!jest.config.ts',
    '!*.d.ts',
    '!**/**.mock.{ts,tsx}',
    '!**/**.handlers.{ts,tsx}',
  ],
  collectCoverage: false,
  coverageReporters: ['text', 'html'],
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  modulePathIgnorePatterns: ['dist'],
}
