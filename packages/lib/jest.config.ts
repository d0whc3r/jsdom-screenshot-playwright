import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  detectOpenHandles: true,
  forceExit: true,
  collectCoverage: !!process.env.CI,
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup-afterenv.ts'],
  setupFiles: ['<rootDir>/jest.setup.ts'],
}

export default config
