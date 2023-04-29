import { close, start } from '../lib/src'
import '@testing-library/jest-dom'
import 'core-js'
import { toMatchImageSnapshot } from 'jest-image-snapshot'

expect.extend({ toMatchImageSnapshot })

beforeAll(async () => {
  await start(
    {
      defaultSelector: 'div', // first div element in rendered html
      launchOptions: {
        args: [
          '--disable-gpu',
          '--no-sandbox',
          '--disable-infobars',
          '--hide-scrollbars',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-skia-runtime-opt',
          '--font-render-hinting=none',
          '--run-all-compositor-stages-before-draw',
          '--disable-new-content-rendering-timeout',
          '--disable-threaded-animation',
          '--disable-threaded-scrolling',
          '--disable-checker-imaging',
          '--disable-image-animation-resync',
          '--disable-features=PaintHolding',
          '--disable-partial-raster',
          '--in-process-gpu',
          '--use-gl=swiftshader',
          '--force-color-profile=srgb',
          '--force-device-scale-factor=1',
          '--single-process',
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-hang-monitor',
          '--disable-ipc-flooding-protection',
          '--disable-renderer-backgrounding',
          '--disable-background-networking',
          '--disable-breakpad',
          '--disable-component-update',
          '--disable-domain-reliability',
          '--disable-sync',
        ],
      },
    },
    {
      viewport: {
        width: 800,
        height: 600,
      },
      screen: {
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
