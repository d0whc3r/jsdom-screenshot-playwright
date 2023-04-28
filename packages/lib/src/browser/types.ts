import type {
  BrowserContextOptions,
  devices,
  LaunchOptions,
  PageScreenshotOptions,
} from 'playwright'

export type BrowserOptions = {
  device?: keyof typeof devices
  launchOptions?: LaunchOptions
  defaultSelector?: string
  maxOpenPages?: number
}
export type BrowserCloseOptions = 'all' | 'context' | 'page'

export type ScreenshotParams = {
  selector?: string
  screenshotOptions?: PageScreenshotOptions
  contextOptions?: BrowserContextOptions
}
