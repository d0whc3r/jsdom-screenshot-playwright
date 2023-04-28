import '@testing-library/jest-dom'
import 'core-js'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import { close, start } from 'jsdom-screenshot-playwright'

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
