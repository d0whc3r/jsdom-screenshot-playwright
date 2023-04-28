import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup-afterenv.ts'],
  collectCoverage: !!process.env.CI,
  modulePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/coverage/'],
  testMatch: ['<rootDir>/src/**/*.spec.ts?(x)'],
}

export default config
