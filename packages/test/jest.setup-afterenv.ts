import { close, start } from '../lib/src'
import '@testing-library/jest-dom'
import 'core-js'
import { configureToMatchImageSnapshot } from 'jest-image-snapshot'

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  diffDirection: 'vertical',
  // useful on CI (no need to retrieve the diff image, copy/paste image content from logs)
  dumpDiffToConsole: true,
  // use SSIM to limit false positive
  // https://github.com/americanexpress/jest-image-snapshot#recommendations-when-using-ssim-comparison
  comparisonMethod: 'ssim',
  customDiffConfig: {
    ssim: 'fast',
  },
  failureThreshold: 0.01,
  failureThresholdType: 'percent',
})
expect.extend({ toMatchImageSnapshot })

beforeAll(async () => {
  await start(
    {
      defaultSelector: 'div', // first div element in rendered html
    },
    {
      viewport: {
        width: 800,
        height: 600,
      },
    }
  )
})

afterAll(async () => {
  await close()
})

beforeEach(() => {
  expect.hasAssertions()
})
