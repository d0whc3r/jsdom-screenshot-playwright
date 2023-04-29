import type {
  BrowserCloseOptions,
  BrowserOptions,
  ScreenshotParams,
} from './types'
import type {
  Browser,
  BrowserContextOptions,
  LaunchOptions,
  Page,
} from 'playwright'
import { chromium, devices, firefox, webkit } from 'playwright'

const defaultDevice: keyof typeof devices = 'Desktop Firefox HiDPI'

export class BrowserInstance {
  private readonly maxOpenPages: number
  private readonly bufferOpenPages: number
  private readonly browser: Promise<Browser>
  private readonly selectedDevice: (typeof devices)[typeof defaultDevice]
  private readonly defaultSelector?: string
  private openPages: Page[] = []

  constructor(
    {
      device = defaultDevice,
      launchOptions,
      maxOpenPages = 10,
      defaultSelector,
    }: BrowserOptions = {},
    private readonly withDebug = false
  ) {
    if (this.withDebug) {
      console.log('[jsdom-screenshot-playwright] constructor', {
        device,
        launchOptions,
        maxOpenPages,
        defaultSelector,
      })
    }
    this.defaultSelector = defaultSelector
    this.maxOpenPages = Math.max(1, maxOpenPages)
    this.bufferOpenPages = Math.ceil(maxOpenPages / 3)
    const { defaultBrowserType } = devices[device]
    const browserOptions: LaunchOptions = {
      headless: true,
      ...launchOptions,
    }
    switch (defaultBrowserType) {
      case 'chromium':
        this.browser = chromium.launch(browserOptions)
        break
      case 'webkit':
        this.browser = webkit.launch(browserOptions)
        break
      case 'firefox':
        this.browser = firefox.launch(browserOptions)
        break
      default:
        throw new Error('Unsupported browser type')
    }
    this.selectedDevice = devices[device]
  }

  get context() {
    return this.browser.then((b) => b.contexts()[0])
  }

  async start(contextOptions?: BrowserContextOptions) {
    if (await this.context) {
      if (this.withDebug) {
        console.log('[jsdom-screenshot-playwright] start (existing Context)')
      }
      return Promise.resolve(true)
    }
    return new Promise<boolean>((resolve, reject) => {
      if (this.withDebug) {
        console.log('[jsdom-screenshot-playwright] start (new Context)')
      }
      this.generateContext(contextOptions)
        .then(() => {
          resolve(true)
        })
        .catch(reject)
    })
  }

  end() {
    return this.close('all')
  }

  async screenshot(
    url: string,
    selector = this.defaultSelector,
    { screenshotOptions, contextOptions }: ScreenshotParams = {}
  ) {
    const page = await this.load(url, contextOptions)
    const element = selector ? page.locator(selector).first() : page
    const result = await element.screenshot(screenshotOptions)
    this.managePages(page)
    return result
  }

  private managePages(page: Page) {
    this.openPages.push(page)
    if (this.openPages.length > this.maxOpenPages) {
      this.openPages.slice(0, this.bufferOpenPages).forEach((p) => p.close())
    }
  }

  private async close(what: BrowserCloseOptions = 'all'): Promise<void> {
    const browser = await this.browser
    try {
      if (what === 'all') {
        await browser.close()
      } else {
        for (const context of browser.contexts()) {
          for (const page of context.pages()) {
            await page.close()
          }
          if (['all', 'context'].includes(what)) {
            await context.close()
          }
        }
      }
    } catch (error) {
      if (this.withDebug) {
        console.error('[jsdom-screenshot-playwright] close', error)
      }
    }
  }

  private async load(
    url: string,
    contextOptions?: BrowserContextOptions
  ): Promise<Page> {
    let cnt = await this.context
    if (!cnt) {
      cnt = await this.generateContext(contextOptions)
    }
    const page = await cnt.newPage()
    if (url) {
      await Promise.all([page.goto(url), page.waitForEvent('load')])
    }
    return page
  }

  private async generateContext(contextOptions?: BrowserContextOptions) {
    const browser = await this.browser
    const options: BrowserContextOptions = {
      ...this.selectedDevice,
      ...contextOptions,
    }
    return await browser.newContext(options)
  }
}
