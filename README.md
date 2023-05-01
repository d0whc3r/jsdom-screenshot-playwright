[![Publish](https://github.com/d0whc3r/jsdom-screenshot-playwright/actions/workflows/publish.yml/badge.svg)](https://github.com/d0whc3r/jsdom-screenshot-playwright/actions/workflows/publish.yml)

# JSDom Screenshot Playwright

📸 Take screenshots of jsdom with playwright

Inspired by [jsdom-screenshot](https://github.com/dferber90/jsdom-screenshot)

## Table of Contents

- [Installation](#installation)
- [Basic usage](#basic-usage)
- [Usage in Jest, React & react-testing-library](#usage-in-jest-react--react-testing-library)
- [API](#api)
  - [`generateImage(options?: ScreenshotParams): Promise<Buffer>`](#generateimageoptions-screenshotparams-promisebuffer)
  - [`start(options?: BrowserOptions, contextOptions?: BrowserContextOptions): Promise<void>`](#startoptions-browseroptions-contextoptions-browsercontextoptions-promisevoid)
  - [`close(): Promise<void>`](#close-promisevoid)
- [Attribution](#attribution)

## Installation

```bash
yarn add -D jsdom-screenshot-playwright
```

# Usage in Jest, React & react-testing-library
It is recommended to use this package with [jest-image-snapshot](https://www.npmjs.com/package/jest-image-snapshot) and [react-testing-library](https://github.com/kentcdodds/react-testing-library). Use it as together like this:

```js
import { generateImage } from "jsdom-screenshot-playwright";
import { render } from "react-testing-library";
import { SomeComponent } from "<your-code>";

it("should have no visual regressions", async () => {
  render(<SomeComponent />);
  expect(await generateImage()).toMatchImageSnapshot();
});
```

Example of `setupFilesAfterEnv` in jest config:

```js
// react-testing-library setup
import '@testing-library/jest-dom'
// playwright polyfills
import 'core-js'
// jest-image-snapshot setup
import { configureToMatchImageSnapshot } from 'jest-image-snapshot'
// jsdom-screenshot-playwright setup
import { close, start } from 'jsdom-screenshot-playwright'

// jest-image-snapshot setup
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

// jsdom-screenshot-playwright setup
beforeAll(async () => {
  // start jsdom-screenshot-playwright before all tests (to avoid starting it for each test and improve performance)
  await start(
    {
      defaultSelector: 'div', // first div element in rendered html
    },
    {
      // playwright context options
      viewport: {
        width: 800,
        height: 600,
      },
    }
  )
})

afterAll(async () => {
  // close jsdom-screenshot-playwright after all tests (close playwright instance)
  await close()
})
```

## API

### `generateImage(options?: ScreenshotParams): Promise<Buffer>`

Takes a screenshot of the current jsdom document and returns a `Buffer` containing the image data.

#### `options`

- `options.selector` (optional) - A selector to use for the screenshot.
- `options.screenshotOptions` (optional) - Options to pass to playwright's [screenshot](https://playwright.dev/docs/api/class-page#page-screenshot) method.
- `options.contextOptions` (optional) - Options to pass to playwright's [launch context](https://playwright.dev/docs/api/class-browser#browser-new-context) method.

### `start(options?: BrowserOptions, contextOptions?: BrowserContextOptions): Promise<void>`

Starts a new playwright instance. This is useful if you want to use the same instance for multiple screenshots.

#### `options`

- `options.device` (optional) - A device to emulate. Defaults to `Desktop Firefox HiDPI`.
- `options.launchOptions` (optional) - Options to pass to playwright's [launch options](https://playwright.dev/docs/api/class-browsertype#browser-type-launch) method.
- `options.defaultSelector` (optional) - A selector to use for the screenshot. Defaults to `body`.
- `options.maxOpenPages` (optional) - Maximum number of pages to open. Defaults to `10`. (to increase performance)
- `options.debug` (optional) - Enable debug mode (logs for internal actions). Defaults to `false`.

#### `contextOptions`

- `contextOptions` (optional) - Options to pass to playwright's [launch context](https://playwright.dev/docs/api/class-browser#browser-new-context) method.

### `close(): Promise<void>`

Closes the current playwright instance.

## Attribution

This package is based on [jsdom-screenshot](https://github.com/dferber90/jsdom-screenshot) by [dferber90](https://github.com/dferber90).
