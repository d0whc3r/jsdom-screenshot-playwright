import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup-afterenv.ts'],
  collectCoverage: !!process.env.CI,
}

export default config
