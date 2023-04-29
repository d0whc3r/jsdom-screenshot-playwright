import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: !!process.env.CI,
  testMatch: ['<rootDir>/src/**/*.spec.ts?(x)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup-afterenv.ts'],
  setupFiles: ['<rootDir>/jest.setup.ts'],
}

export default config
