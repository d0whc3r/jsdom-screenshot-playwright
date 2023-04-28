import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  detectOpenHandles: true,
  forceExit: true,
  collectCoverage: !!process.env.CI,
}

export default config
